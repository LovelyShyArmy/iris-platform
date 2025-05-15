import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'supplier' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      nav("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Créer un compte IRIS</h2>
      <input type="text" placeholder="Nom de l'entreprise"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border" required />
      <input type="email" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border" required />
      <input type="password" placeholder="Mot de passe"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border" required />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
        className="w-full p-2 border">
        <option value="buyer">Acheteur</option>
        <option value="supplier">Fournisseur</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2">S'inscrire</button>
    </form>
  );
}
