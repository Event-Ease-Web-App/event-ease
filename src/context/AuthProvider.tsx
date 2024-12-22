"use client";
import { auth } from "@/firebase/config";
import { handleFirebaseError } from "@/firebase/handleFirebaseErrors";
import { AuthWithEmailAndPassword } from "@/types/auth";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
type UserType = User | null;

interface AuthContextType {
  currentUser: UserType;
  loading: boolean;
  signInUser: ({ email, password }: AuthWithEmailAndPassword) => Promise<{
    success: boolean;
    user?: User;
    message?: string;
  }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{
    success: boolean;
    user?: User;
    message?: string;
  }>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInUser: async () => ({
    success: false,
    message: "signInUser non implémenté",
  }),
  signOut: async () => {},
  signInWithGoogle: async () => ({
    success: false,
    message: "signInWithGoogle non implémenté",
  }),
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: AuthWithEmailAndPassword): Promise<{
    success: boolean;
    user?: User;
    message?: string;
  }> => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredentials.user };
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        const handledFirebaseError = handleFirebaseError(error);
        console.log(handledFirebaseError);
        return {
          message: handledFirebaseError,
          success: false,
        };
      }
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      return { success: true, user: result.user };
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return { success: false, message: errorMessage };
    }
  };

  const value = { currentUser, loading, signInUser, signOut, signInWithGoogle };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
