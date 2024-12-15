"use client";

import { useState } from "react";
import { auth } from "../firebaseConfig"; // Import de FirebaseConfig (remonte d'un niveau)
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Compte créé avec succès !");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Connexion réussie !");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-8 w-full max-w-md" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {isSignUp ? "S'inscrire" : "Se connecter"}
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        type="button"
        className="text-blue-500 mt-4 hover:underline"
      >
        {isSignUp ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
      </button>
    </form>
  );
}
