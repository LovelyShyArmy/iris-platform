import { useEffect, useState } from "react";
import axios from "axios";

export default function MatchResults({ offerId }) {
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [minScore, setMinScore] = useState(50);
  const [requiredCert, setRequiredCert] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/match", { offerId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setMatches(res.data);
      setFiltered(res.data);
    });
  }, [offerId]);

  const applyFilters = () => {
    let result = matches;

    if (minScore) {
      result = result.filter(r => r.score >= parseInt(minScore));
    }

    if (requiredCert) {
      result = result.filter(r =>
        r.audit?.certifications?.includes(requiredCert)
      );
    }

    if (region) {
      result = result.filter(r =>
        r.supplier?.region?.toLowerCase().includes(region.toLowerCase())
      );
    }

    setFiltered(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">🎯 Résultats Matching avec Filtres</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm">Score Min</label>
          <input type="number" value={minScore} onChange={e => setMinScore(e.target.value)}
            className="w-full border p-2" />
        </div>
        <div>
          <label className="block text-sm">Certification Requise</label>
          <input type="text" value={requiredCert} onChange={e => setRequiredCert(e.target.value)}
            className="w-full border p-2" placeholder="ex: ISO 9001" />
        </div>
        <div>
          <label className="block text-sm">Région</label>
          <input type="text" value={region} onChange={e => setRegion(e.target.value)}
            className="w-full border p-2" placeholder="Europe, US, etc." />
        </div>
        <div className="col-span-3">
          <button onClick={applyFilters} className="bg-green-700 text-white px-4 py-2 mt-2">
            🔎 Appliquer les filtres
          </button>
        </div>
      </div>

      {filtered.map((m, i) => (
        <div key={i} className="border p-4 mb-3 bg-white rounded shadow">
          <p className="font-bold">{m.supplier.name} (Score: {m.score}/100)</p>
          <p>Email: {m.supplier.email}</p>
          <p>Région: {m.supplier?.region || 'Non défini'}</p>
          <p>Certifications: {m.audit?.certifications?.join(', ') || 'Aucune'}</p>
        </div>
      ))}

      {!filtered.length && <p className="text-gray-500">Aucun fournisseur ne correspond à vos filtres.</p>}
    </div>
  );
}
