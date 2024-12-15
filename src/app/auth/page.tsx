import Form from "./form"; // Importe le composant Form

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold">Authentification</h1>
      <Form /> {/* Intègre le formulaire */}
    </div>
  );
}
