import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function SocketComponent() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("localhost:3000", { secure: false });
    setSocket(socket);

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("message", (msg) => {
      setMessages(state => [...state, msg]);
    });

    return () => socket.emit('end');
  }, []);

  const sendPing = (e) => {
    e.preventDefault();
    socket.send("Socket component here!");
  }

  return (
    <div>
      <p>Socket Component</p>
      <button onClick={sendPing}>Send Ping</button>
      <ul>
        {messages.map((msg) => {
          return <li>{msg}</li>
        })
        }
      </ul>
    </div>
  )
}