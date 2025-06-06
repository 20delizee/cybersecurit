import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">CyberGuardian</h1>
      <p className="mb-4">
        Signalez un site suspect (phishing, arnaque, vol de données…) ou vérifiez si un site est dangereux.
      </p>
      <div className="flex gap-4">
        <Link href="/report" className="btn btn-primary">Signaler un site</Link>
        <Link href="/search" className="btn btn-secondary">Rechercher un site</Link>
      </div>
      <div className="mt-8">
        <Link href="/danger-list" className="underline">Voir la liste des sites dangereux</Link>
      </div>
      <div className="mt-8 text-sm">
        <Link href="/login" className="underline">Espace administration</Link>
      </div>
      <div className="mt-8 text-sm">
        <Link href="/register" className="underline">se créer un compte</Link>
      </div>
    </main>
  );
}