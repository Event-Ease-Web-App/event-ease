import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { SignUpFormData } from "@/types/types";
import { formFieldsValidation } from "@/middleware/formFieldsValidation";
import { signUpSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const form: SignUpFormData = await req.json();
    const validationError = await formFieldsValidation(req, form, signUpSchema);
    if (validationError.status !== 200) return validationError;

    const { email, password } = form;
    console.log("test");

    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("test2");
    return NextResponse.json(
      {
        user: result.user,
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
