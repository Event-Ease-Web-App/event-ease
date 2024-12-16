import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { SignUpFormData } from "@/types/types";

export async function POST(req: Request) {
  try {
    const form: SignUpFormData = await req.json();
    const { email, password } = form;

    const result = await createUserWithEmailAndPassword(auth, email, password);
    return NextResponse.json(
      {
        user: result?.user,
        error: "",
        status: "SUCCESS",
      },
      { status: 200 }
    );
  } catch (error: any) {
    const errorMessage = error?.code || "Une erreur inattendue s'est produite";
    console.log(errorMessage);
    return NextResponse.json(
      {
        error: errorMessage,
        status: "ERROR",
      },
      { status: 400 }
    );
  }
}
