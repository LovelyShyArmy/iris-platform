import { useState } from "react";
import axios from "axios";

export default function UploadPDF({ onUpload }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      onUpload(res.data.url);
      setMsg("✅ Fichier uploadé");
    } catch (err) {
      setMsg("❌ Erreur upload");
    }
  };

  return (
    <div className="mt-4">
      <input type="file" accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2" />
      <button onClick={handleUpload}
        className="bg-blue-700 text-white px-4 py-1">📤 Upload</button>
      <p className="text-sm mt-1">{msg}</p>
    </div>
  );
}
