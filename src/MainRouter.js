import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import LoginApp from './login'
import HomePage  from './Home'
import SignupApp from './Signup'
import GomokuApp from './gomoku'

const MainRouter = () => {
  return (
    <div id='main'>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginApp />} />
          <Route path='/signup' element={<SignupApp />} />
          <Route path='/gomoku' element={<GomokuApp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainRouter