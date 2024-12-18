import { AuthRepository } from "@/app/repository/AuthRepository";
import { handleFirebaseError } from "@/firebase/handleFirebaseErrors";
import { FirebaseError } from "firebase/app";

export class AuthService {
  _authRepository = new AuthRepository();

  _manageUserRegister = async (req: Request) => {
    const { email, password } = await req.json();
    try {
      const user = await this._authRepository._registerUser({
        email,
        password,
      });
      await this._authRepository._sendEmailVerification(user);
      await this._authRepository._createFirestoreUserFromAuthUser(user);
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
          error: "Une erreur inattendue s'est produite",
          status: 500,
        };
      }
    }
  };
}
