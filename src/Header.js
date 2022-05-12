import './header.css'

import LoginMenu from "./Components/LoginMenu"

const Header = ({ is_login, logoutEvent }) => {
  return (
    <div id="header">
      <a href="/">Home</a>
      <a href="/gomoku">Gomoku</a>
      <div id="loginmenu_box">
      <LoginMenu is_login={is_login} logoutEvent={logoutEvent} />
      </div>
    </div>
  )
}

export default Header