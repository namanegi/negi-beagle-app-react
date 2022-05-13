import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import LoginApp from '../Components/Auth/Login'
import HomePage  from '../Components/Home'
import SignupApp from '../Components/Auth/Signup'
import GomokuApp from '../Components/Gomoku/Gomoku'
import GomokuWSApp from '../Components/Gomoku/GomokuWS'
import LobbyApp from '../Components/Gomoku/GomokuLobby'

const MainRouter = ({ username, is_login }) => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginApp is_login={is_login} />} />
          <Route path='/signup' element={<SignupApp is_login={is_login}/>} />
          {/* <Route path='/gomoku/:roomid/:username' element={<GomokuWSApp />} /> */}
          <Route path='/gomoku/:roomid' element={<GomokuWSApp username={username} />} />
          <Route path='/gomoku/local' element={<GomokuApp />} />
          <Route path='/gomoku' element={<LobbyApp username={username} />} />
          <Route path='/' element={<HomePage username={username} is_login={is_login}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainRouter