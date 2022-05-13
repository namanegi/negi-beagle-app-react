const Room = require('./room')
const WebSocket = require('ws');
const uuid = require('uuid');

const wsServer = new WebSocket.Server({ port: 5001 });

let room_list = []

wsServer.on('connection', server => {
  Object.assign(
    server,
    {
      id: uuid.v4(),
      username: 'initial',
      room: 0
    }
  )
  
  server.on('message', message => {
    console.log('message received')
    parsedMessage = JSON.parse(message)
    console.log(server.id, parsedMessage)
    get_room_by_id = getRoomById(parsedMessage.roomid)
    
    switch (parsedMessage.type) {
      case 'entry':
        server.username = parsedMessage.username
        server.room = parsedMessage.roomid
        if (get_room_by_id.length === 0) {
          let new_room = new Room(parsedMessage.roomid)
          new_room.join(parsedMessage.username)
          room_list.push(new_room)
        } else {
          get_room_by_id[0].join(parsedMessage.username)
        }
        break
      case 'joinGame':
        get_room_by_id[0].joinGame(parsedMessage.username)
        break
      case 'playChess':
        get_room_by_id[0].updateBoard(parsedMessage.x, parsedMessage.y)
        break
      case 'endGame':
        get_room_by_id[0].updateRes(parsedMessage.newRes)
        break
      case 'resetRoom':
        get_room_by_id[0].resetRoom()
        break
      default:
        break
    }
    broadcastRoom(parsedMessage.roomid)
  });

  server.on('close', () => {
    room_list.forEach(room => {
      room.leave(server.username)
      broadcastRoom(room.roomid)
    })
  })
});

const getRoomById = (roomid) => room_list.filter((room) => room.roomid === parsedMessage.roomid)

const broadcastRoom = (roomid) => {
  target_room = room_list.filter(room => room.roomid === roomid)[0]
  if (target_room) {
    target_room.playerlist.forEach(player => {
      client = findClientByName(player)
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(target_room.to_json()))
      }
    })
  }
}

const findClientByName = (username) => {
  let clientFound;
  wsServer.clients.forEach(client => {
    if (client.username === username && client.readyState === WebSocket.OPEN) {
      clientFound = client;
    }
  })
  return clientFound
}

const findClientById = (id) => {
  let clientFound;
  wsServer.clients.forEach(client => {
    if (client.id === id && client.readyState === WebSocket.OPEN) {
      clientFound = client;
    }
  })
  return clientFound
}

const broadcast = (message) => {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}


console.log('websocket起動中...');