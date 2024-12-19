"use client";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetSignUpInput, SignUpInput } from "@/lib/schemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchRegisterUser } from "@/lib/auth";

const SignUpForm = () => {
  const [submittedForm, setIsSubmittedForm] = useState<boolean>(false);
  const [isFormSuccess, setIsFormSuccess] = useState<boolean>(false);
  const [formResultMessage, setFormResultMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(GetSignUpInput()),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    setIsPending(true);
    setIsSubmittedForm(true);

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }
    const gReCaptchaToken = await executeRecaptcha("signupForm");
    const response = await fetchRegisterUser(data, gReCaptchaToken);
    console.log(response);
    setIsFormSuccess(response.success);

    setFormResultMessage(response.message);
    setIsPending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Inscription</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            {isPending ? "Inscription ..." : "S'inscrire"}
          </button>
          {submittedForm && formResultMessage && (
            <p className={isFormSuccess ? "text-green-500" : "text-red-500"}>
              {formResultMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
