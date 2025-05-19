import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/metrics", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, []);

  if (!data) return <p>Chargement des données...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Statistiques Plateforme</h2>
      <ul className="space-y-2">
        <li>👥 Utilisateurs totaux: {data.users}</li>
        <li>📄 Offres totales: {data.offers}</li>
        <li>📆 Offres 7 derniers jours: {data.recentOffers}</li>
        <li>🤝 Matchs réalisés: {data.matchCount}</li>
        <li>⭐ Note moyenne fournisseurs: {data.avgRating}</li>
      </ul>
    </div>
  );
}
