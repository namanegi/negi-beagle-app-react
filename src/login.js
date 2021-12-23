import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import "./login.css"
import ErrorMes from './Errormes'

const LoginApp = () => {
  const api_url = process.env.REACT_APP_API_URL

  const [usr, setUsr] = useState("")
  const [pwd, setPwd] = useState("")
  const [isShow, setShow] = useState(false)
  const [errMes, setError] = useState("")
  const [cookies, setCookies] = useCookies(["username", "token"])

  const onUsrChange = (event) => {
    setUsr(event.target.value)
  }
  const onPwdChange = (event) => {
    setPwd(event.target.value)
  }

  const loginFunc = (event) => {
    event.preventDefault()

    const json_data = {
      usr,
      pwd
    }
    const post_url = api_url + 'login'

    axios({
      method: 'POST',
      url: post_url,
      data: json_data,
      validateStatus: (status) => status <= 400
    }).then(response => {
        if (response.data.status === "OK") {
          setCookies("username", usr)
          setCookies("token", response.data.token)
          window.location.href = '/'
          console.log(cookies)
        } else {
          setError(response.data.message)
        }
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
            <td colSpan="3"><a href="/signup" id="tosignup" className="toLink">＞アカウントお持ちしていない方はこちら</a></td>
          </tr>
          <tr>
            <td colSpan="3"><a href="/forget" id="toforget" className="toLink">＞パスワードを忘れた方はこちら</a></td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  )
}

export default LoginApp;