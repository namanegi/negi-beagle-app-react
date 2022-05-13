import {
  Link
} from 'react-router-dom'

const HomePage = ({ username, is_login }) => {

  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        {(!is_login) ? <Link to="/login">Login</Link> : <></>}
      </nav>
      <p>hello, {username}</p>
    </div>
  )
}

export default HomePage