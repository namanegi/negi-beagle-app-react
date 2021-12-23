import {
  Link
} from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  </div>
  )
}

export default HomePage