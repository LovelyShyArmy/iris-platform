import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Connexion IRIS 🧑‍💻</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        className="w-full p-2 border" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"
        className="w-full p-2 border" required />
      <button className="bg-blue-600 text-white px-4 py-2">Connexion</button>
    </form>
  );
}
