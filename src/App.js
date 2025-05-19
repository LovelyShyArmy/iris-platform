// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue sur mon App React !</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link to="/" style={linkStyle}>
            Accueil
          </Link>
          <Link to="/login" style={linkStyle}>
            Se connecter
          </Link>
          <Link to="/register" style={linkStyle}>
            S’inscrire
          </Link>
        </nav>
      </header>

      <main style={{ padding: "2rem" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "#61dafb"
};

export default App;
