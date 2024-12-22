import { auth, db } from "@/firebase/config";
import { COLLECTIONS } from "@/firebase/constants";
import {
  AuthWithEmailAndPassword,
  AuthWithEmailAndRole,
  RegisterUserFieldsInFirestore,
  UserRoles,
} from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export class AuthRepository {
  _registerUserInFireAuth = async ({
    email,
    password,
  }: AuthWithEmailAndPassword) => {
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

  _createFirestoreUserFromAuthUser = async (
    user: User,
    data: RegisterUserFieldsInFirestore
  ) => {
    const { role } = data;
    const usersRef = collection(db, COLLECTIONS.USERS);
    await setDoc(doc(usersRef, user.uid), {
      email: user.email,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  _getFirestoreUserDocToSignIn = async ({
    email,
    role,
  }: AuthWithEmailAndRole) => {
    // The point is to look for the specified role, or admin or super-admin role, not just login the user
    const usersRef = collection(db, COLLECTIONS.USERS);
    const userQuery = query(usersRef, where("email", "==", email));
    const querySnap = await getDocs(userQuery); // We have to use getDocs instead of getDoc because we're querying a collection

    const userDoc = querySnap.docs[0];

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userRole = userData?.role;

      if (
        userRole === role ||
        userRole === UserRoles.ADMIN ||
        userRole === UserRoles.SUPER_ADMIN
      ) {
        return userData;
      }
    }
  };

  _SignInUser = async ({ email, password }: AuthWithEmailAndPassword) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  };
}
