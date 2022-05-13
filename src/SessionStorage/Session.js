import { useState } from "react"

const Session = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken?.token
  }

  const [ token, setToken ] = useState(getToken())

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify({token: userToken}))
    setToken(userToken.token)
  }

  const clearToken = () => {
    sessionStorage.clear()
    setToken(null)
  }

  return {
    token,
    setToken: saveToken,
    clearToken
  }
}

export default Session