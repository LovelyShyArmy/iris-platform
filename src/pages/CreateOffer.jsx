import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateOffer() {
  const [form, setForm] = useState({
    type: 'offer', title: '', description: '', industry: '', deadline: ''
  });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/offers", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    nav("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">📢 Publier une {form.type === 'offer' ? "offre" : "demande"}</h2>
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
        className="w-full p-2 border">
        <option value="offer">Offre</option>
        <option value="need">Demande</option>
      </select>
      <input type="text" placeholder="Titre" className="w-full p-2 border"
        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" className="w-full p-2 border"
        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="text" placeholder="Secteur industriel" className="w-full p-2 border"
        value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} />
      <input type="date" className="w-full p-2 border"
        value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
      <button className="bg-blue-700 text-white px-4 py-2">📤 Publier</button>
    </form>
  );
}
