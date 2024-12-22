import { NextResponse } from "next/server";
import { AuthService } from "@/services/AuthService";

export async function POST(req: Request) {
  const { email, role } = await req.json();
  const _authService = new AuthService();

  // Check if user exists in firestore
  const result = await _authService._getFirestoreUserToSignIn({
    email: email,
    role: role,
  });

  if (result.status !== 200) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }
  const firestoreUser = result.user;

  //   // Sign in user
  //   const signInResult = await _authService._manageUserSignIn({
  //     email: email,
  //     password: password,
  //   });
  //   if (signInResult.status !== 200) {
  //     return NextResponse.json(
  //       { message: signInResult.message },
  //       { status: signInResult.status }
  //     );
  //   }
  //   const signInSuccess = signInResult.message;

  //   // Check if user email is verified
  //   const isUserEmailVerified = await _authService._isUserEmailVerified();

  //   if (!isUserEmailVerified) {
  //     return NextResponse.json(
  //       { message: "Veuillez vérifier votre adresse e-mail" },
  //       { status: 403 }
  //     );
  //   }
  //   const idToken = await auth.currentUser?.getIdToken();
  return NextResponse.json(
    {
      message: result.message,
      user: firestoreUser,
    },
    { status: result.status }
  );
}
