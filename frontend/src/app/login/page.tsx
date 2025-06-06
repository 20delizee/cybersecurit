"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      // Stocke le token JWT pour les requêtes futures
      localStorage.setItem("adminToken", data.token);
      router.push("/dashboard");
    } else {
      setError(data.error || "Erreur de connexion");
    }
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Connexion Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          className="input mb-2 w-full"
          placeholder="Identifiant"
          value={login.username}
          onChange={e => setLogin(l => ({ ...l, username: e.target.value }))}
          required
        />
        <input
          className="input mb-2 w-full"
          type="password"
          placeholder="Mot de passe"
          value={login.password}
          onChange={e => setLogin(l => ({ ...l, password: e.target.value }))}
          required
        />
        <button className="btn btn-primary w-full" type="submit">Se connecter</button>
        {error && <div className="text-red-700 mt-2">{error}</div>}
      </form>
      <div className="mt-4 text-sm">
        <a href="/admin/register" className="underline">Créer un compte admin</a>
      </div>
    </div>
  );
}