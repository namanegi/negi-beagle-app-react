import { useEffect, useState } from "react"
import "./login.css"
import ErrorMes from '../Errormes'
import { postRequest } from "../../Client/api"
import { Link, Navigate } from "react-router-dom"
import Session from "../../SessionStorage/Session"

const LoginApp = ({ is_login }) => {
  const [usr, setUsr] = useState("")
  const [pwd, setPwd] = useState("")
  const [isShow, setShow] = useState(false)
  const [errMes, setError] = useState("")
  const [redirect, setRedirect] = useState(is_login)

  useEffect(() => {
    if (is_login) {
      setRedirect(is_login)
    }
  }, [is_login])

  const { setToken } = Session()

  const onUsrChange = (event) => {
    setUsr(event.target.value)
  }
  const onPwdChange = (event) => {
    setPwd(event.target.value)
  }

  const loginFunc = (event) => {
    event.preventDefault()

    const json_data = {
      username: usr,
      password: pwd
    }

    postRequest('/login', json_data)
    .then(response => {
      // console.log(response.data.access_token)
      setToken(response.data.access_token)
      window.location = '/'
    })
    .catch(error => {
      console.log(error)
      setError(error.response.data.detail)
    })
  }

  return (
    <div id="loginbox">
    <form onSubmit={loginFunc}>
      <table>
        <tbody>
          <tr>
            <td className="label" id="usr-label">ユーザー名:</td>
            <td colSpan="2">
              <input 
                type="text" 
                id="usr"
                name="usr"
                value={usr}
                onChange={onUsrChange}
                placeholder="ユーザー名を入力してください"
              />
            </td>
          </tr>
          <tr>
            <td className="label" id="pwd_label">パスワード：</td>
            <td colSpan="2">
              <input
                type={isShow ? 'text' : 'password'}
                id="pwd"
                name="pwd"
                value={pwd}
                onChange={onPwdChange}
                placeholder="パスワードを入力してください"
              />
            </td>
          </tr>
          <tr id="showPwd">
            <td colSpan="3">
              <p
                onClick={() => setShow((!isShow))}
              >
                {isShow ? 'PWを非表示' : 'PWを表示'}
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="3"><button type="submit">ログイン</button></td>
          </tr>
          <tr>
            <td colSpan="3"><ErrorMes value={errMes} /></td>
          </tr>
          <tr>
            <td colSpan="3"><Link to="/signup" id="tosignup" className="toLink">＞アカウントお持ちしていない方はこちら</Link></td>
          </tr>
          <tr>
            <td colSpan="3"><Link to="/forget" id="toforget" className="toLink">＞パスワードを忘れた方はこちら</Link></td>
          </tr>
        </tbody>
      </table>
    </form>
    {
      (redirect) ?
      <Navigate to='/' />
      :
      <></>
    }
    </div>
  )
}

export default LoginApp;