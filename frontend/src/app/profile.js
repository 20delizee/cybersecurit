import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupère les infos du user depuis le localStorage
    const u = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
    setUser(u);
  }, []);

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Non connecté.</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Mon Profil</h2>
        <div className="mb-2"><strong>Nom:</strong> {user.name}</div>
        <div className="mb-2"><strong>Email:</strong> {user.email}</div>
        {/* Ajoute ici avatar, bio, etc. selon tes besoins */}
      </div>
    </main>
  );
}