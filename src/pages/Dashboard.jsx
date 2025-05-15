import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data)).catch(() => alert("Erreur Auth"));
  }, []);

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Bienvenue, {user.name}</h2>
      <p>Rôle: {user.role}</p>
      <p>Email: {user.email}</p>
      {/* 🚀 Add links to offers, profile editor, matching */}
    </div>
  );
}
