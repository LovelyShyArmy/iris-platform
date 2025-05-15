import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setNotes(res.data));
  }, []);

  const markRead = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:5000/api/notifications/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(notes.map(n => n._id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
      {notes.map(n => (
        <div key={n._id} className={`p-2 border-b ${n.read ? "text-gray-500" : "font-semibold"}`}>
          <p>{n.message}</p>
          {!n.read && (
            <button onClick={() => markRead(n._id)}
              className="text-sm text-blue-600 underline">Marquer comme lu</button>
          )}
        </div>
      ))}
    </div>
  );
}
