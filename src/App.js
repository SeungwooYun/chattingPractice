import { useState, useEffect } from "react";
import "./App.css";
import socket from './server'
import InputField from './components/InputField/InputField.jsx'
import MessageContainer from "./components/MessageContainer/MessageContainer.js"

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [messageList, setMessageList] = useState([])
  console.log("messageList", messageList)

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message))
    });
    askUserName();
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
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
