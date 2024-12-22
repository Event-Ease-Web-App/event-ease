import { AuthRepository } from "@/repository/AuthRepository";
import { auth } from "@/firebase/config";
import { handleFirebaseError } from "@/firebase/handleFirebaseErrors";
import {
  AuthWithEmailAndPassword,
  AuthWithEmailAndRole,
  UserRoles,
} from "@/types/auth";
import { FirebaseError } from "firebase/app";

export class AuthService {
  _authRepository = new AuthRepository();

  _manageUserRegister = async (req: Request) => {
    const { email, password, role } = await req.json();
    try {
      const user = await this._authRepository._registerUserInFireAuth({
        email,
        password,
      });
      await this._authRepository._sendEmailVerification(user);
      await this._authRepository._createFirestoreUserFromAuthUser(user, {
        role: role,
      });
      return { status: 201 };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const handledFirebaseError = handleFirebaseError(error);
        return {
          message: handledFirebaseError,
          status: 422,
        };
      } else {
        return {
          message: "Une erreur inattendue s'est produite",
          status: 500,
        };
      }
    }
  };

  _getFirestoreUserToSignIn = async ({ email, role }: AuthWithEmailAndRole) => {
    try {
      const userData = await this._authRepository._getFirestoreUserDocToSignIn({
        email,
        role,
      });

      if (!userData) {
        return {
          message: `Aucun ${
            role === UserRoles.ORGANIZER
              ? "compte organisateur"
              : "compte participant"
          } trouvé avec cet email.`,
          status: 404,
        };
      }

      return { status: 200, user: userData };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const handledFirebaseError = handleFirebaseError(error);
        return {
          message: handledFirebaseError,
          status: 500,
        };
      } else {
        return {
          message: "Une erreur inattendue s'est produite",
          status: 500,
        };
      }
    }
  };

  _manageUserSignIn = async ({ email, password }: AuthWithEmailAndPassword) => {
    try {
      const user = await this._authRepository._SignInUser({
        email,
        password,
      });

      if (!user) {
        return {
          message: `Aucun compte trouvé avec cet email dans la collection spécifiée.`,
          status: 404,
        };
      }
      return { message: "La connexion a réussi !", status: 200 };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const handledFirebaseError = handleFirebaseError(error);
        return {
          error: handledFirebaseError,
          status: 422,
        };
      } else {
        return {
          error: "Une erreur inattendue s'est produite",
          status: 500,
        };
      }
    }
  };

  _isUserEmailVerified = async () => {
    return auth.currentUser?.emailVerified;
  };

  _isUserLoggedIn = () => {
    if (!auth.currentUser) {
      return {
        message: "Aucun utilisateur connecté.",
        status: 401,
      };
    }
    return { status: 200 };
  };
}
