import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { postRequest } from '../../Client/api'
import ErrorMes from "../Errormes"
import "./login.css"

const SignupApp = ({ is_login }) => {
  const [usr, setUsr] = useState("")
  const [pwd, setPwd] = useState("")
  const [chPwd, setChPwd] = useState("")
  const [isShow, setShow] = useState(false)
  const [errMes, setError] = useState("")
  const [redirect, setRedirect] = useState(is_login)

  useEffect(() => {
    if (is_login) {
      setRedirect(is_login)
    }
  }, [is_login])

  const onUsrChange = (event) => {
    setUsr(event.target.value)
  }
  const onPwdChange = (event) => {
    setPwd(event.target.value)
    pwdSame(event.target.value, chPwd)
  }
  const onChPwdChange = (event) => {
    setChPwd(event.target.value)
    pwdSame(pwd, event.target.value)
  }
  const pwdSame = (pw1, pw2) => {
    if (pw1 !== pw2) {
      setError('PWと確認用PWが不一致しています')
    } else {
      setError('')
    }
  }

  const signFunc = (event) => {
    event.preventDefault()
    const json_data = {
      username: usr,
      password: pwd
    }
    postRequest('/signup', json_data)
    .then(response => {
      // change later
      window.location.href = '/'
    })
    .catch(error => {
      console.log(234234, error.response.data.detail)
      setError(error.response.data.detail)
    })
  }

  return (
    <div id="loginbox">
    <form onSubmit={signFunc}>
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
            <td className="label" id="pwd-label">パスワード：</td>
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
          <tr>
            <td className="label" id="ch_pwd_label">確認用パスワード：</td>
            <td colSpan="2">
              <input
                type={isShow ? 'text' : 'password'}
                id="ch_pwd"
                name="ch_pwd"
                value={chPwd}
                onChange={onChPwdChange}
                placeholder="パスワードを再び入力してください"
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
            <td colSpan="3"><button type="submit">ユーザー登録</button></td>
          </tr>
          <tr>
            <td colSpan="3"><ErrorMes value={errMes} /></td>
          </tr>
          <tr>
            <td colSpan="3"><a href="/login" id="tologin" className="toLink">＞既にアカウント登録済みの方はこちら</a></td>
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

export default SignupApp