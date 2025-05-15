import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get("http://localhost:5000/api/offers", { headers })
      .then(res => {
        const users = res.data.map(o => o.createdBy).filter(u => u && u._id !== localStorage.getItem("id"));
        const unique = Array.from(new Map(users.map(u => [u._id, u])).values());
        setContacts(unique);
      });
  }, []);

  const loadChat = async (id) => {
    setActiveChat(id);
    const res = await axios.get(`http://localhost:5000/api/messages/${id}`, { headers });
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!text) return;
    const res = await axios.post("http://localhost:5000/api/messages", {
      receiverId: activeChat,
      content: text
    }, { headers });
    setMessages(prev => [...prev, res.data]);
    setText("");
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="border-r p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">💬 Messagerie</h2>
        {contacts.map(c => (
          <div key={c._id} onClick={() => loadChat(c._id)}
            className="p-2 border-b cursor-pointer hover:bg-gray-100">
            {c.name} ({c.role})
          </div>
        ))}
      </div>
      <div className="col-span-2 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto border p-4 mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.sender === activeChat ? "text-left" : "text-right"}`}>
              <span className="bg-gray-200 px-2 py-1 rounded">{m.content}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={text} onChange={e => setText(e.target.value)}
            placeholder="Écrire un message..." className="flex-1 border p-2" />
          <button onClick={sendMessage} className="bg-blue-700 text-white px-4">Envoyer</button>
        </div>
      </div>
    </div>
  );
}
