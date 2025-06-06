"use client";
import { useState } from "react";

export default function ReportPage() {
  const [form, setForm] = useState({ url: "", category: "phishing", danger: "", description: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/tickets", { // utilise un proxy ou modifie en http://localhost:4000/api/tickets si besoin
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setMessage(res.ok ? "Signalement envoyé !" : "Erreur lors de l'envoi.");
  }

  return (
    <form className="max-w-lg mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Signaler un site suspect</h2>
      <input required className="input mb-2 w-full" placeholder="URL du site"
        value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
      <select className="select mb-2 w-full" value={form.category}
        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
        <option value="phishing">Phishing</option>
        <option value="arnaque">Arnaque</option>
        <option value="malware">Malware</option>
        <option value="autres">Autres</option>
      </select>
      <input required className="input mb-2 w-full" placeholder="Type de danger (ex: vol de données, DNS…)"
        value={form.danger} onChange={e => setForm(f => ({ ...f, danger: e.target.value }))} />
      <textarea className="textarea mb-2 w-full" placeholder="Description"
        value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <button className="btn btn-primary w-full" type="submit">Envoyer</button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}