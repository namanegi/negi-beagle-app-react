import './gomoku.css';
import { useState } from 'react';

const Chess = (props) => {
  const classType = {
    "0": "plain",
    "1": "white chess",
    "2": "black chess"
  }
  return (
    <span className={classType[props.value]} />
  )
}

const Button = ({val, nm, clEvent}) => <button onClick={() => clEvent()} id={nm}>{val}</button>

const PrintCell = (props) => {
  return (
    <div className="cell" onClick={() => props.clEvent(props.x, props.y)}>
      <Chess value={props.value} />
    </div>
  )
}

const PrintBoard = (props) => {
  const sz = props.scale * 50
  const st = {
    width: sz + "px",
    height: sz + "px"
  }
  console.log(st)
  return (
    <div id="board" style={st}>
      {
        props.board.map((element, i) => {
          return (
            element.map((it, j) => {
              return (
                <PrintCell value={it} key={String(i)+String(j)} x={i} y={j} clEvent={props.clEvent}/>
              )
            })
          )
        })
      }
    </div>
  )
}

const ResultScreen = (props) => {
  const endCheck = {
    "0": "not_end",
    "1": "end",
    "2": "end",
    "3": "end"
  }
  return (
    <div id="result_back" className={endCheck[props.player]}>
      <div id="result">
        <div id="result_text">{props.player}</div>
        <div id="restart">
          <Button val={"Restart"} clEvent={props.clEvent} nm={"rt_but"}/>
        </div>
      </div>
    </div>
  )
} 

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
      <PrintBoard board={cb} turn={t} clEvent={playChess} scale={scale}/>
      <ResultScreen player={res} clEvent={resetBoard}/>
    </>
  );
}

export default GomokuApp