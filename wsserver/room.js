class Room {
  constructor(roomid) {
    this.roomid = roomid
    this.first = ''
    this.second = ''
    this.playerlist = []
    this.status = 'waiting'
    this.board = []
    this.turn = 'first'
    this.scale = 12
    this.result = ''
    for (let i=0;i<this.scale;i++) {
      let row = []
      for (let j=0;j<this.scale;j++) {
        row.push("0")
      }
      this.board.push(row)
    }
  }
  resetRoom() {
    this.first = ''
    this.second = ''
    this.status = 'waiting'
    this.board = []
    this.turn = 'first'
    this.scale = 12
    this.result = ''
    for (let i=0;i<this.scale;i++) {
      let row = []
      for (let j=0;j<this.scale;j++) {
        row.push("0")
      }
      this.board.push(row)
    }
  }
  join(usr) {
    if (!this.playerlist.includes(usr)) {
      this.playerlist.push(usr)
    }
  }
  leave(usr) {
    this.playerlist = this.playerlist.filter((player) => {return player !== usr})
  }
  joinGame(usr) {
    if (this.playerlist.includes(usr)) {
      if (this.first === '') {
        this.first = usr
      } else if (this.second === '') {
        this.second = usr
        this.start()
      }
    }
  }
  start() {
    if ((this.first !== '') && (this.second !== '')) {
      this.status = 'playing'
      this.turn = 'first'
    }
  }
  updateBoard(x, y) {
    if (this.board[x][y] === '0') {
      this.board[x][y] = (this.turn === 'first') ? '1' : '2'
      this.turn = (this.turn === 'first') ? 'second' : 'first'
    }
  }
  updateRes(res) {
    if (this.status === 'playing') {
      this.result = res
      this.status = 'end'
    }
  }
  to_json() {
    return {
      roomid: this.roomid,
      first: this.first,
      second: this.second,
      turn: this.turn,
      status: this.status,
      board: this.board,
      playerlist: this.playerlist,
      result: this.result
    }
  }
}

module.exports = Room