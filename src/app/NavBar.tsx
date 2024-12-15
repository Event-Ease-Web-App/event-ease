"use client"; // Indique que ce composant est côté client

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import de la configuration Firebase

const handleSignOut = async () => {
  await signOut(auth);
  alert("Déconnecté !");
};

export default function NavBar() {
  return (
    <nav className="flex items-center gap-4 p-4 bg-gray-100">
      <a href="/auth" className="text-blue-500 hover:underline">Connexion/Inscription</a>
      <button
        onClick={handleSignOut}
        className="text-red-500 hover:underline"
      >
        Déconnexion
      </button>
    </nav>
  );
}
