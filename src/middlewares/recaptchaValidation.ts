import { RECAPTCHA_V3 } from "@/constants/env";
import axios from "axios";

export async function recaptchaValidation(gReCaptchaToken: string) {
  const isValid = await fetchRecaptchaValidateURL(gReCaptchaToken);
  if (!isValid) {
    return { error: "Invalid reCAPTCHA validation", status: 403 };
  }

  return { error: null };
}

export async function fetchRecaptchaValidateURL(gReCaptchaToken: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = RECAPTCHA_V3.validationBaseURL as string;

  try {
    const { data } = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: gReCaptchaToken,
      },
    });

    return data.success;
  } catch (error) {
    console.error("An error occurred on Recaptcha validation", error);
    return false;
  }
}
