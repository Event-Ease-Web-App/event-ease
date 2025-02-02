import { API_ENDPOINTS } from "@/constants/api";
import { SignInInput, SignUpInput } from "./schemas/forms";
import { SignInOrSignUpResponse } from "@/types/auth";
import { api } from "./api-client";

export const fetchRegisterUser = async (
  formData: SignUpInput,
  gReCaptchaToken: string
): Promise<SignInOrSignUpResponse> => {
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

export const fetchSignInUser = async (
  formData: SignInInput,
  gReCaptchaToken: string
): Promise<SignInOrSignUpResponse> => {
  return api
    .post(API_ENDPOINTS.USER_SIGN_IN, formData, {
      headers: {
        "g-recaptcha-token": gReCaptchaToken,
      },
    })
    .then((res) => {
      return {
        message: res.data.message,
        success: true,
        user: res.data.user,
      };
    })
    .catch((err) => {
      console.log(err);
      return { message: err.response.data.message, success: false };
    });
};
