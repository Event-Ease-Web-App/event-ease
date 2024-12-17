import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { NextResponse } from "next/server";
import { SignUpFormData } from "@/types/forms";
import { formFieldsValidation } from "@/middleware/formFieldsValidation";
import { signUpSchema } from "@/lib/validation";
import { FirebaseError } from "firebase/app";
import { handleFirebaseError } from "@/firebase/handleFirebaseErrors";

export async function POST(req: Request) {
  try {
    const form: SignUpFormData = await req.json();
    const validationError = await formFieldsValidation(req, form, signUpSchema);
    if (validationError.status !== 200) return validationError;

    const { email, password } = form;

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    await sendEmailVerification(user);
    console.log(user.email);

    return NextResponse.json(
      {
        user: user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      const handledFirebaseError = handleFirebaseError(error);
      return NextResponse.json(
        {
          error: handledFirebaseError,
        },
        { status: 422 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Une erreur inattendue s'est produite",
        },
        { status: 500 }
      );
    }
  }
}
