import { useEffect, useState } from "react";
import axios from "axios";

export default function AlertCenter() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAlerts(res.data));
  }, []);

  const formatType = (type) => {
    switch (type) {
      case "match": return "🎯 Match trouvé";
      case "message": return "📩 Nouveau message";
      case "rating": return "⭐ Nouvelle évaluation";
      case "system": return "🔔 Système";
      default: return "🔔 Notification";
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🔔 Centre d’Alerte IRIS</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map(alert => (
            <li key={alert._id} className={`p-4 border rounded ${alert.read ? 'bg-gray-100' : 'bg-white'}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{new Date(alert.createdAt).toLocaleString()}</span>
                <span className="text-xs text-blue-700">{formatType(alert.type)}</span>
              </div>
              <p className="mt-2">{alert.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
