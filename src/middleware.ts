import { recaptchaValidation } from "@/middleware/recaptchaValidation";
import { sendErrorResponse } from "@/middleware/responseHandler";
import { NextRequest, NextResponse } from "next/server";
import { formFieldsValidation } from "./middleware/formFieldsValidation";
import { GetSignUpInput } from "./lib/schemas/forms";

export async function middleware(req: NextRequest) {
  const gReCaptchaToken = req.headers.get("g-recaptcha-token");
  if (!gReCaptchaToken) {
    return NextResponse.json(
      { message: "Missing reCAPTCHA token" },
      { status: 400 }
    );
  }
  const result = await recaptchaValidation(gReCaptchaToken);
  if (result.error) {
    return sendErrorResponse(result.error, result.status);
  }
  const formData = { ...(await req.json()) };
  const resultStatus = await formFieldsValidation(formData, GetSignUpInput());
  if (resultStatus.status !== 200)
    return sendErrorResponse(resultStatus.message, resultStatus.status);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/auth/:path*"],
};
