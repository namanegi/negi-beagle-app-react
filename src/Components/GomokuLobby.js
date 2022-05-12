import {
  useState
} from 'react'

import Button from "./Button"

const LobbyApp = () => {
  const [name, setName] = useState('')
  const [roomid, setRoom] = useState(0)

  const onNameChange = (event) => {
    setName(event.target.value)
  }
  const onRoomChange = (event) => {
    setRoom(event.target.value)
  }

  const entryRoom = (url) => {
    // console.log(url)
    window.location = url
  }

  return (
    <div id="lobby">
      <input id="name" type="text" value={name} onChange={onNameChange}/>
      <input id="roomid" type="number" value={roomid} onChange={onRoomChange}/>
      <Button clEvent={() => entryRoom('/gomoku/' + String(roomid) + '/' + name)} val={"enter room"} nm={"enterRoom"} />
    </div>
  )
}

export default LobbyApp