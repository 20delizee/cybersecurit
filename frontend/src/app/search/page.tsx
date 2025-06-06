"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/tickets?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.tickets || []);
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Recherche de sites dangereux</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
        <input className="input flex-1" placeholder="Nom ou URL du site"
          value={query} onChange={e => setQuery(e.target.value)} />
        <button className="btn btn-secondary" type="submit">Chercher</button>
      </form>
      <ul>
        {results.map(ticket => (
          <li key={ticket.id} className="border my-2 p-2">
            <Link href={`/danger/${ticket.id}`} className="font-semibold underline">{ticket.url}</Link>
            <div className="text-xs">{ticket.danger}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}