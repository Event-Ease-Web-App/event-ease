import { FirebaseError } from "firebase/app";

export const handleFirebaseError = (error: FirebaseError) => {
  let errorMessage = "";
  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "Cet e-mail est déjà utilisé. Veuillez utiliser un autre.";
      break;
    case "auth/invalid-email":
      errorMessage = "L'e-mail fourni n'est pas valide. Veuillez vérifier.";
      break;
    case "auth/weak-password":
      errorMessage = "Le mot de passe est trop faible. Minimum 6 caractères.";
      break;
    case "auth/user-not-found":
      errorMessage = "Aucun utilisateur trouvé avec cet e-mail.";
      break;
    case "auth/wrong-password":
      errorMessage = "Mot de passe incorrect. Veuillez réessayer.";
      break;
    case "auth/network-request-failed":
      errorMessage = "Problème de réseau. Veuillez vérifier votre connexion.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
      break;
    case "auth/internal-error":
      errorMessage = "Erreur interne. Veuillez réessayer plus tard.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Cette opération n'est pas autorisée.";
      break;
    default:
      errorMessage = "Une erreur inconnue est survenue.";
      break;
  }

  return errorMessage;
};
