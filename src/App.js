import { useState, useEffect } from "react";
import "./App.css";
import socket from './server'
import InputField from './components/InputField/InputField.jsx'

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    askUserName()
  }, [])


  const askUserName = () => {
    const userName = prompt("Type your name")
    console.log(userName);
    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data)
      }
    })
  }

  const sendMessage = (event) => {
    event.preventDefault()
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res)
    })
  }
  return (
    <div>
      <div className="App">
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
