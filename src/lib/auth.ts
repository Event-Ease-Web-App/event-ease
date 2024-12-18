import { API_ENDPOINTS } from "@/constants/api";
import axios from "axios";
import { SignUpInput } from "./schemas/forms";

type SignUpResponse = {
  message: string;
  success: boolean;
};
export const fetchRegisterUser = async (
  formData: SignUpInput,
  gReCaptchaToken: string
): Promise<SignUpResponse> => {
  return await axios
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
