import { useEffect, useState } from "react";
import axios from "axios";

export default function AuditDashboard() {
  const [audit, setAudit] = useState(null);
  const [certs, setCerts] = useState(['']);
  const [note, setNote] = useState('');

  const fetchAudit = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/audit/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAudit(res.data);
  };

  const saveAudit = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:5000/api/audit", {
      certifications: certs.filter(Boolean),
      notes: note
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAudit(res.data);
  };

  useEffect(() => { fetchAudit(); }, []);

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">📊 Audit Industriel</h2>

      <div>
        <label>Certifications (ISO, AS…):</label>
        {certs.map((c, i) => (
          <input key={i} type="text" value={c}
            onChange={e => {
              const newCerts = [...certs];
              newCerts[i] = e.target.value;
              setCerts(newCerts);
            }}
            className="w-full border p-2 mt-2"
            placeholder={`Cert #${i + 1}`} />
        ))}
        <button onClick={() => setCerts([...certs, ''])} className="mt-2 px-3 py-1 bg-gray-300">+ Add</button>
      </div>

      <textarea placeholder="Notes d'audit" className="w-full border p-2"
        value={note} onChange={e => setNote(e.target.value)} />

      <button onClick={saveAudit} className="bg-blue-600 text-white px-4 py-2">📤 Soumettre Audit</button>

      {audit && (
        <div className="mt-6 border p-4">
          <p className="font-bold text-lg">🧾 Score Total: {audit.totalScore}/100</p>
          <p>Capacité: {audit.capacityScore} / Conformité: {audit.complianceScore}</p>
          <p>📝 Notes: {audit.notes}</p>
          <p>📜 Certifs: {audit.certifications.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
