import { useState } from "react";
import axios from "axios";

export default function RateSupplier({ supplierId, offerId }) {
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/ratings", {
        supplierId, offerId, stars, comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg("✅ Notation enregistrée");
    } catch (err) {
      setMsg("⚠️ Déjà noté ou erreur");
    }
  };

  return (
    <div className="border p-4 mt-4">
      <h3 className="font-bold">⭐ Noter ce fournisseur</h3>
      <select value={stars} onChange={e => setStars(e.target.value)}
        className="border p-2 my-2">
        {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} étoile{+s > 1 ? 's' : ''}</option>)}
      </select>
      <textarea placeholder="Commentaire optionnel"
        className="w-full border p-2"
        value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 mt-2">Envoyer</button>
      <p className="text-sm mt-2">{msg}</p>
    </div>
  );
}
<p>⭐ Note moyenne: {supplier.rating || "Non évalué"}</p>
