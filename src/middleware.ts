import { recaptchaValidation } from "@/middleware/recaptchaValidation";
import { sendErrorResponse } from "@/middleware/responseHandler";
import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/auth/:path*"],
};
