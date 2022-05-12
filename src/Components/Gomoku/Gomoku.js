import './gomoku.css';
import { useState } from 'react';
import GomokuBoard from './GomokuBoard'
import ResultScreen from './GomokuRes';

const GomokuApp = () => {
  const scale = 12
  let initBoard = []
  for (let i=0;i<scale;i++) {
    let row = []
    for (let j=0;j<scale;j++) {
      row.push("0")
    }
    initBoard.push(row)
  }

  const [cb, setCb] = useState(initBoard)
  const [t, setT] = useState("1")
  const [res, setRes] = useState(0)

  const playChess = (x, y) => {
    if (cb[x][y] === "0") {
      let newBoard = cb.map((el) => el)
      newBoard[x][y] = t
      let newTurn = "0"
      let newRes = "0"
      if (t === "1") {
        newTurn = "2"
      } else {
        newTurn = "1"
      }

      const ref = t.repeat(5)
      console.log(ref)
      let check_win = ["", "", "", ""]
      for (let i=-4;i<=4;i++) {
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
      console.log(check_win)
      check_win.forEach(it => {
        if (it.includes(ref)) {
          newRes = t
        }
      })
      const ct = cb.map(row => row.filter(it => it === "0").length).reduce((sum, it) => sum+it)
      if ((newRes === "0") && (ct === 0)) {
        newRes = "3"
      }

      setCb(newBoard)
      setT(newTurn)
      setRes(newRes)
    }
  }

  const resetBoard = () => {
    setCb(initBoard)
    setT("1")
    setRes("0")
  }

  return (
    <>
      <GomokuBoard board={cb} turn={t} clEvent={playChess} scale={scale}/>
      <ResultScreen player={res} clEvent={resetBoard}/>
    </>
  );
}

export default GomokuApp