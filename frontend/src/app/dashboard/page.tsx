"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("Non autorisé, veuillez vous connecter.");
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/admin/tickets?status=pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          setMessage("Session expirée ou non autorisée.");
          router.push("/login");
          return { tickets: [] };
        }
        return res.json();
      })
      .then(data => setTickets(data.tickets || []));
  }, [router]);

  async function handleAction(id: string, status: "valid" | "refused") {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`http://localhost:5000/api/admin/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setTickets(tickets => tickets.filter(t => t.id !== id));
      setMessage("Ticket mis à jour !");
    } else if (res.status === 401) {
      setMessage("Non autorisé, veuillez vous reconnecter.");
      router.push("/login");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Tickets à valider</h2>
      {message && <div className="mb-2 text-green-700">{message}</div>}
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id || ticket.id} className="border my-2 p-2 rounded">
            <div className="font-semibold">{ticket.url}</div>
            <div className="text-xs">{ticket.danger} - {ticket.category}</div>
            <div className="my-2">{ticket.description}</div>
            <div className="flex gap-2">
              <button className="btn btn-success" onClick={() => handleAction(ticket._id || ticket.id, "valid")}>Valider</button>
              <button className="btn btn-error" onClick={() => handleAction(ticket._id || ticket.id, "refused")}>Refuser</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}