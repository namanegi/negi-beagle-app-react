import {
  useState
} from 'react'
import { Navigate } from 'react-router-dom'
import Button from "../Button"

const LobbyApp = ({ username }) => {
  const [roomid, setRoom] = useState(0)
  const [entry, setEntry] = useState(false)

  const onRoomChange = (event) => {
    setRoom(event.target.value)
  }

  return (
    <div id="lobby">
      <p>Welcom to Gomoku Game Lobby, {username} !</p>
      <input id="roomid" type="number" value={roomid} onChange={onRoomChange}/>
      
      {
        (entry) ?
        <Navigate to={'/gomoku/' + String(roomid)} />
        :
        <Button 
          clEvent={() => setEntry(true)} 
          val={"enter room"} 
          nm={"enterRoom"} 
        />
      }
    </div>
  )
}

export default LobbyApp