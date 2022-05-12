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

const PrintCell = (props) => {
  return (
    <div className="cell" onClick={() => props.clEvent(props.x, props.y)}>
      <Chess value={props.value} />
    </div>
  )
}

const GomokuBoard = (props) => {
  const sz = props.scale * 50
  const st = {
    width: sz + "px",
    height: sz + "px"
  }
  console.log('gomokuboard', st)
  return (
    <div id="board" style={st}>
      {
        (props.board)
        ? 
        props.board.map((element, i) => {
          return (
            element.map((it, j) => {
              return (
                <PrintCell value={it} key={String(i)+String(j)} x={i} y={j} clEvent={props.clEvent}/>
              )
            })
          )
        })
        : ''
      }
    </div>
  )
}

export default GomokuBoard