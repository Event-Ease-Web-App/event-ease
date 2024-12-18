import { auth, db } from "@/firebase/config";
import { COLLECTIONS } from "@/firebase/constants";
import { RegisterUser } from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export class AuthRepository {
  _registerUser = async ({ email, password }: RegisterUser) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  };
  _sendEmailVerification = async (user: User) => {
    await sendEmailVerification(user);
  };

  _createFirestoreUserFromAuthUser = async (user: User) => {
    const usersRef = collection(db, COLLECTIONS.USERS);
    await setDoc(doc(usersRef, user.uid), {
      email: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };
}