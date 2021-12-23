import './App.css'

import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import Header from './Header'
import MainRouter from './MainRouter'

const App = () =>  {
  const [cookies, setCookies] = useCookies(["username", "token"])
  const [is_login, setIsLogin] = useState(false)
  const api_url = process.env.REACT_APP_API_URL
  const check_url = api_url + 'check_online'
  const json_data = {
    usr: cookies.username,
    token: cookies.token
  }
  axios({
    method: 'POST',
    url: check_url,
    data: json_data,
    validateStatus: (status) => status <= 400
  }).then(response => {
    if (response.data.status === 'OK') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })
  const logoutFunc = () => {
    const logout_url = api_url + 'logout'
    axios({
      method: 'POST',
      url: logout_url,
      data: json_data,
      validateStatus: (status) => status <= 400
    }).then(response => {
      if (response.data.status === 'OK') {
        console.log('LogoutSuccess')
      } else {
        console.log(response.data)
      }
    })
    setCookies("username", "")
    setCookies("token", "")
  }
  return (
    <>
      <Header is_login={is_login} logoutEvent={logoutFunc} />
      <MainRouter is_login={is_login} />
    </>
  )
}

export default App
