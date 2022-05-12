import Button from '../Button'

const ResultScreen = (props) => {
  const endCheck = {
    "0": "not_end",
    "1": "end",
    "2": "end",
    "3": "end"
  }
  const resName = {
    "1": props.first,
    "2": props.second,
    "3": 'draw'
  }
  return (
    <div id="result_back" className={endCheck[props.res]}>
      <div id="result">
        <div id="result_text">{resName[props.res]}</div>
        <div id="restart">
          <Button val={"Restart"} clEvent={props.clEvent} nm={"rt_but"}/>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen