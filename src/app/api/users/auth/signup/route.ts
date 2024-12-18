import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { SignUpFormData } from "@/types/forms";
import { formFieldsValidation } from "@/middleware/formFieldsValidation";
import { signUpSchema } from "@/lib/validation";
import { FirebaseError } from "firebase/app";
import { handleFirebaseError } from "@/firebase/handleFirebaseErrors";
import { collection, doc, setDoc } from "firebase/firestore";
import { COLLECTIONS } from "@/firebase/constants";
import { APP_ROLES } from "@/constants/env";
import { recaptchaValidation } from "@/middleware/recaptchaValidation";

export async function POST(req: Request) {
  try {
    const form: SignUpFormData = await req.json();
    const { email, password, confirmPassword } = form;
    const fieldsToCheck = { email, password, confirmPassword };
    // const validationError = await formFieldsValidation(
    //   req,
    //   fieldsToCheck,
    //   signUpSchema
    // );
    // if (validationError.status !== 200) return validationError;

    // const userCredentials = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // const user = userCredentials.user;
    // await sendEmailVerification(user);

    // const usersRef = collection(db, COLLECTIONS.USERS);
    // await setDoc(doc(usersRef, user.uid), {
    //   email: email,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   role: APP_ROLES.ADMIN,
    // });
    return NextResponse.json(
      {
        test: "test",
      },
      { status: 201 }
    );

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
