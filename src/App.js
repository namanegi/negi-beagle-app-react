import './App.css'

import { useEffect, useState } from 'react'

import Header from './Components/Header'
import MainRouter from './Router/MainRouter'
import Session from './SessionStorage/Session'
import { getRequest } from './Client/api'

const App = () =>  {
  const { token, clearToken } = Session()
  const [ username, setUsername ] = useState('guest')
  const [is_login, setLogin] = useState(false)

  useEffect(() => {
    if (token) {
      getRequest('/user/me', null, token)
      .then(res => {
        // console.log(res.data)
        setUsername(res.data.username)
        setLogin(true)
      })
      .catch(() => {
        clearToken()
        setUsername('guest')
        setLogin(false)
      })
    } else {
      setUsername('guest')
      setLogin(false)
    }
  }, [token, clearToken])

  return (
    <>
      <Header is_login={is_login} logoutEvent={clearToken} />
      <MainRouter username={username} is_login={is_login} />
    </>
  )
}

export default App
