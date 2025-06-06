import { useEffect, useState, useRef } from "react";

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const socketRef = useRef();

  // Récupère la liste des utilisateurs (à adapter pour ton backend)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/users`)
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // Récupère les messages quand un user est sélectionné
  useEffect(() => {
    if (selectedUser && user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/messages/${selectedUser._id}?myId=${user.id}`)
        .then(res => res.json())
        .then(setMessages);
    }
  }, [selectedUser, user]);

  // WebSocket (Socket.io) pour les messages temps réel
  useEffect(() => {
    if (!user) return;
    import("socket.io-client").then(({ default: io }) => {
      socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");
      socketRef.current.on(`message_${user.id}`, (data) => {
        if (selectedUser && data.sender === selectedUser._id) {
          setMessages((msgs) => [...msgs, data]);
        }
      });
    });
    return () => socketRef.current?.disconnect();
  }, [user, selectedUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const msg = {
      sender: user.id,
      recipient: selectedUser._id,
      content,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });
    socketRef.current.emit("send_message", msg);
    setMessages((msgs) => [...msgs, { ...msg, timestamp: new Date() }]);
    setContent("");
  };

  return (
    <main className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Utilisateurs</h2>
        <ul>
          {users.filter(u => u._id !== user?.id).map(u => (
            <li
              key={u._id}
              className={`cursor-pointer mb-2 p-2 rounded ${selectedUser?._id === u._id ? "bg-blue-200" : "hover:bg-blue-50"}`}
              onClick={() => setSelectedUser(u)}
            >
              {u.name}
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="bg-white shadow px-4 py-2">
          <h2 className="font-bold">
            {selectedUser ? `Conversation avec ${selectedUser.name}` : "Sélectionne un utilisateur"}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.sender === user.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded ${msg.sender === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        {selectedUser && (
          <form onSubmit={sendMessage} className="flex p-4 bg-white">
            <input
              type="text"
              className="flex-1 border rounded p-2 mr-2"
              placeholder="Tape un message..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Envoyer</button>
          </form>
        )}
      </section>
    </main>
  );
}