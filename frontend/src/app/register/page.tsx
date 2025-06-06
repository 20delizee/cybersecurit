"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (form.password !== form.confirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    const res = await fetch("http://localhost:5000/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.username, password: form.password }),
    });
    if (res.ok) {
      setMessage("Admin créé avec succès !");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      const data = await res.json();
      setMessage(data.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Créer un compte Administrateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input mb-2 w-full"
          placeholder="Identifiant"
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          required
        />
        <input
          className="input mb-2 w-full"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
        />
        <input
          className="input mb-2 w-full"
          type="password"
          placeholder="Confirmation du mot de passe"
          value={form.confirm}
          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
          required
        />
        <button className="btn btn-primary w-full" type="submit">
          S’inscrire
        </button>
        {message && <div className="mt-2">{message}</div>}
      </form>
      <div className="mt-4 text-sm">
        <a href="/login" className="underline">Déjà un compte ? Se connecter</a>
      </div>
    </div>
  );
}