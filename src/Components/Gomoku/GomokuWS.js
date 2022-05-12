import './gomoku.css';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useParams
} from 'react-router-dom'
import GomokuBoard from './GomokuBoard'
import ResultScreen from './GomokuRes';
import Button from '../Button';

const Playground = ({ playerlist }) => {
  if (!playerlist) {
    playerlist = []
  }
  return (
    <div id='playground'>
      <div id='plContainer'>
        <ul>
          {playerlist.map((player, i) => {
            return <li key={i} >{player}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

const GomokuWSBoard = ({ roomid, username, room, clEvent }) => {
  const scale = 12
  let initBoard = []
  for (let i=0;i<scale;i++) {
    let row = []
    for (let j=0;j<scale;j++) {
      row.push("0")
    }
    initBoard.push(row)
  }

  useEffect(() => {
    setPl(room.playerlist)
    setCb(room.board)
    setT(room.turn)
    if (room.status === 'end') {
      setRes(room.result)
    }
  }, [room])

  const [cb, setCb] = useState(initBoard)
  const [t, setT] = useState("first")
  const [res, setRes] = useState(0)
  const [pl, setPl] = useState([])

  const upTable = () => {
    clEvent(JSON.stringify({
      type: 'joinGame',
      username,
      roomid
    }))
  }

  const playChess = (x, y) => {
    if ((room.status === 'playing') && (username === room[t]) && (cb[x][y] === "0")) {
      clEvent(JSON.stringify({
        type: 'playChess',
        roomid,
        x,
        y
      }))
      const selft = (username === room.first) ? '1' : '2'
      const ref = selft.repeat(5)
      let check_win = ["", "", "", ""]
      for (let i=-4;i<=4;i++) {
        if (i === 0) {
          for (let j=0;j<=3;j++) {
            check_win[j] = check_win[j] + selft
          }
          continue
        }
        if ((0 <= x+i) && (x+i < scale)) {
          check_win[0] = check_win[0] + cb[x+i][y]
        }
        if ((0 <= y+i) && (y+i < scale)) {
          check_win[1] = check_win[1] + cb[x][y+i]
        }
        if ((0 <= x+i) && (x+i < scale) && (0 <= y+i) && (y+i < scale)) {
          check_win[2] = check_win[2] + cb[x+i][y+i]
        }
        if ((0 <= x+i) && (x+i < scale) && (0 <= y-i) && (y-i < scale)) {
          check_win[3] = check_win[3] + cb[x+i][y-i]
        }
      }
      let newRes = '0'
      console.log(check_win)
      check_win.forEach(it => {
        if (it.includes(ref)) {
          newRes = selft
        }
      })
      const ct = cb.map(row => row.filter(it => it === "0").length).reduce((sum, it) => sum+it)
      if ((newRes === "0") && (ct === 0)) {
        newRes = "3"
      }
      if (newRes !== '0') {
        clEvent(JSON.stringify({
          type: 'endGame',
          roomid,
          newRes
        }))
      }
    }
  }

  const resetBoard = () => {
    setCb(initBoard)
    setT("1")
    setRes("0")
    clEvent(JSON.stringify({
      type: 'resetRoom',
      roomid
    }))
  }

  return (
    <>
      {
        (room.first === '') && (room.second !== username) ? 
        <Button val={'Up'} nm={'up1'} clEvent={upTable}/>
        :
        <span>{room.first}</span>
      }
      <GomokuBoard board={cb} turn={t} clEvent={playChess} scale={scale} />
      {
        (room.first !== username) && (room.second === '') ? 
        <Button val={'Up'} nm={'up1'} clEvent={upTable}/>
        :
        <span>{room.second}</span>
      }
      <Playground playerlist={pl}/>
      <ResultScreen first={room.first} second={room.second} res={res} clEvent={resetBoard} />
    </>
  );
}

const GomokuWSApp = () => {
  const { roomid, username } = useParams()
  const socket = useRef(null)
  const [room, setRoom] = useState({})

  useEffect(() => {
    socket.current = new WebSocket('ws://192.168.1.155:5001')
    socket.current.onopen = () => {
      socket.current.send(JSON.stringify({
        type: 'entry',
        roomid,
        username
      }))
    }
    socket.current.onmessage = (event) => {
      let parsedMessage = JSON.parse(event.data)
      console.log(parsedMessage)
      setRoom(parsedMessage)
    }
  }, [socket, username, roomid])
  const sendMessageEvent = (message) => {
    socket.current.send(message)
  }

  return (
    <GomokuWSBoard roomid={roomid} username={username} room={room} clEvent={sendMessageEvent} />
  )
}

export default GomokuWSApp