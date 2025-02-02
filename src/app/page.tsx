"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

export default function Home() {
  const { signOut, currentUser, signInWithGoogle } = useAuth();

  const handleSignOut = async () => {
    try {
      if (!currentUser) return;
      await signOut();
      console.log("Déconnecté avec succès");
    } catch (error) {
      console.error("Erreur lors de la tentative de déconnexion", error);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {currentUser && <button onClick={handleSignOut}>Déconnexion</button>}
        {!currentUser && (
          <button onClick={signInWithGoogle}>Se connecter avec Google</button>
        )}
        <Link href="auth/inscription">S&apos;inscrire</Link>
        <Link href="auth/connexion">Se connecter</Link>
      </main>
    </div>
  );
}
