// Détail d’un signalement validé
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DangerDetailPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tickets/${params.id}`).then(res => res.json()).then(setTicket);
  }, [params.id]);

  if (!ticket) return <div>Chargement…</div>;
  return (
    <div className="max-w-xl mx-auto my-8 p-4 border rounded">
      <h2 className="text-xl font-bold">{ticket.url}</h2>
      <div className="text-red-700 font-semibold">{ticket.danger}</div>
      <div className="mt-2">{ticket.description}</div>
      <div className="mt-2 text-sm text-gray-500">Signalé le {new Date(ticket.createdAt).toLocaleDateString()}</div>
    </div>
  );
}