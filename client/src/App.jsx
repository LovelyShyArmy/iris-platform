import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}


import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split('.')[1])).id;
    socket.emit("register", userId);

    socket.on("notification", (data) => {
      alert(`🔔 ${data.text}`);
    });
  }, []);

  return <Routes>...</Routes>;
}
