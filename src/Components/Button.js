const Button = ({val, nm, clEvent}) => <button onClick={() => clEvent()} id={nm}>{val}</button>

export default Button