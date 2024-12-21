import { API_ENDPOINTS } from "@/constants/api";
import { SignUpInput } from "./schemas/forms";
import { SignUpResponse } from "@/types/auth";
import { api } from "./api-client";

export const fetchRegisterUser = async (
  formData: SignUpInput,
  gReCaptchaToken: string
): Promise<SignUpResponse> => {
  return api
    .post(API_ENDPOINTS.USER_SIGNUP, formData, {
      headers: {
        "g-recaptcha-token": gReCaptchaToken,
      },
    })
    .then((res) => {
      return { message: res.data.message, success: true };
    })
    .catch((err) => {
      return { message: err.response.data.message, success: false };
    });
};
