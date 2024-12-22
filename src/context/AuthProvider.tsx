"use client";
import { auth } from "@/firebase/config";
import { AuthWithEmailAndPassword } from "@/types/auth";
import { signInWithEmailAndPassword, User } from "firebase/auth";
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
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInUser: async () => ({
    success: false,
    message: "signInUser non implémenté",
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
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, signInUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
