import { recaptchaValidation } from "@/middlewares/recaptchaValidation";
import { sendErrorResponse } from "@/middlewares/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { formFieldsValidation } from "./middlewares/formFieldsValidation";
import { GetSignInInput, GetSignUpInput } from "./lib/schemas/forms";

export async function middleware(req: NextRequest) {
  const gReCaptchaToken = req.headers.get("g-recaptcha-token");
  if (!gReCaptchaToken) {
    return NextResponse.json(
      { message: "Le token ReCaptcha n'est pas présent" },
      { status: 400 }
    );
  }
  const result = await recaptchaValidation(gReCaptchaToken);
  if (result.error) {
    return sendErrorResponse(result.error, result.status);
  }

  if (req.nextUrl.pathname.includes("sign-up")) {
    const formData = { ...(await req.json()) };
    const resultStatus = await formFieldsValidation(formData, GetSignUpInput());
    if (resultStatus.status !== 200)
      return sendErrorResponse(resultStatus.message, resultStatus.status);
  }

  if (req.nextUrl.pathname.includes("sign-in")) {
    const formData = { ...(await req.json()) };
    const resultStatus = await formFieldsValidation(formData, GetSignInInput());
    if (resultStatus.status !== 200)
      return sendErrorResponse(resultStatus.message, resultStatus.status);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/auth/:path*"],
};
