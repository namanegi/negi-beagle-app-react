const LoginMenu = ({ is_login, logoutEvent }) => {
  if (is_login) {
    return <div className="logoutbtn" onClick={logoutEvent}>ログアウト</div>
  } else {
    return <a className="loginbtn" href="/login">ログイン</a>
  }
}

export default LoginMenu