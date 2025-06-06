// Liste publique de tous les sites validés comme dangereux
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DangerListPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tickets?status=valid").then(res => res.json()).then(data => setTickets(data.tickets || []));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Liste des sites dangereux validés</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} className="border-b p-2">
            <Link href={`/danger/${ticket.id}`} className="font-semibold underline">{ticket.url}</Link>
            <span className="ml-2 text-xs">{ticket.danger}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}