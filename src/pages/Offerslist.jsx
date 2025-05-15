import { useEffect, useState } from "react";
import axios from "axios";

export default function OffersList() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/offers")
      .then(res => setOffers(res.data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">📄 Toutes les offres & demandes</h2>
      {offers.map(o => (
        <div key={o._id} className="border p-4 mb-3">
          <p className="font-bold">{o.type.toUpperCase()} – {o.title}</p>
          <p>{o.description}</p>
          <p className="text-sm text-gray-600">🧑‍💼 {o.createdBy?.name} — {o.industry}</p>
        </div>
      ))}
    </div>
  );
}
