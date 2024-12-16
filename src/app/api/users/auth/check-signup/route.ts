import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { SignUpFormData } from "@/types/forms";
import { formFieldsValidation } from "@/middleware/formFieldsValidation";
import { signUpSchema } from "@/lib/validation";
import { EmailService } from "@/service/emailService";
import { UserAccount } from "@/utils/userAccount";

export async function POST(req: Request) {
  try {
    const form: SignUpFormData = await req.json();
    const validationError = await formFieldsValidation(req, form, signUpSchema);
    if (validationError.status !== 200) return validationError;

    const { email, password } = form;
    console.log("test");

    const result = await createUserWithEmailAndPassword(auth, email, password);

    const validationToken = UserAccount.generateUniqueToken();
    console.log("validationToken:", validationToken);

    await EmailService.sendRegisterValidation(
      email,
      email,
      validationToken._uuid
    );

    return NextResponse.json(
      {
        user: result.user,
        error: "",
        status: "SUCCESS",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error:", error);
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
