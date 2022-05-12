import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import LoginApp from './Components/Login'
import HomePage  from './Components/Home'
import SignupApp from './Components/Signup'
import GomokuApp from './Components/Gomoku/Gomoku'
import GomokuWSApp from './Components/Gomoku/GomokuWS'
import LobbyApp from './Components/GomokuLobby'

const MainRouter = ({ username }) => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginApp />} />
          <Route path='/signup' element={<SignupApp />} />
          <Route path='/gomoku/:roomid/:username' element={<GomokuWSApp />} />
          {/* <Route path='/gomoku/:roomid' element={<GomokuWSApp username={username} />} /> */}
          <Route path='/gomoku/local' element={<GomokuApp />} />
          <Route path='/gomoku' element={<LobbyApp />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainRouter