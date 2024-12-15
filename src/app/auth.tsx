// src/app/auth/page.tsx
import Form from "./auth/form"; // Import du composant Form

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold">Authentification</h1>
      <Form /> {/* Intégration du composant Form */}
    </div>
  );
}
