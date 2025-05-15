import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users", { headers }).then(res => setUsers(res.data));
    axios.get("http://localhost:5000/api/admin/offers", { headers }).then(res => setOffers(res.data));
    axios.get("http://localhost:5000/api/admin/stats", { headers }).then(res => setStats(res.data));
  }, []);

  const toggleUser = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/users/${id}/toggle`, {}, { headers });
    const res = await axios.get("http://localhost:5000/api/admin/users", { headers });
    setUsers(res.data);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">🛠️ Admin Dashboard IRIS</h2>

      {stats && (
        <div className="mb-6 bg-gray-100 p-4 rounded shadow">
          <p>👥 Total utilisateurs: {stats.users}</p>
          <p>📄 Total offres/demandes: {stats.offers}</p>
          <p>⭐️ Note moyenne fournisseurs: {stats.avgRating}/5</p>
        </div>
      )}

      <h3 className="font-bold text-lg mt-6 mb-2">👥 Utilisateurs</h3>
      {users.map(u => (
        <div key={u._id} className="border p-2 mb-2 flex justify-between items-center">
          <span>{u.name} ({u.role}) – {u.email}</span>
          <button onClick={() => toggleUser(u._id)}
            className={`px-2 py-1 ${u.active ? "bg-red-600" : "bg-green-600"} text-white`}>
            {u.active ? "Bannir" : "Réactiver"}
          </button>
        </div>
      ))}

      <h3 className="font-bold text-lg mt-6 mb-2">📢 Offres/Demandes</h3>
      {offers.map(o => (
        <div key={o._id} className="border p-2 mb-2">
          <p><strong>{o.title}</strong> ({o.type})</p>
          <p>{o.description}</p>
          <p><small>Posté par: {o.createdBy?.name}</small></p>
        </div>
      ))}
    </div>
  );
}
