"use client";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetSignInInput, SignInInput } from "@/lib/schemas/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchSignInUser } from "@/lib/auth";
import { UserRoles, UserSignInOrSignUpRoles } from "@/types/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

const SignInPage = () => {
  const [submittedForm, setIsSubmittedForm] = useState<boolean>(false);
  const [isFormFailure, setIsFormFailure] = useState<boolean>(false);
  const [formResultMessage, setFormResultMessage] = useState<string>("");
  const [role, setRole] = useState<UserSignInOrSignUpRoles>(
    UserRoles.PARTICIPANT
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const { signInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInInput>({
    resolver: zodResolver(GetSignInInput()),
    defaultValues: {
      email: "",
      password: "",
      role: UserRoles.PARTICIPANT,
    },
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    setIsPending(true);
    setIsSubmittedForm(true);
    setFormResultMessage("");

    if (!executeRecaptcha) {
      console.log("Le recaptcha n'est pas encore accessible");
      return;
    }
    const gReCaptchaToken = await executeRecaptcha("signInForm");

    const response = await fetchSignInUser(data, gReCaptchaToken);
    if (!response.success) {
      setIsFormFailure(response.success);
      setFormResultMessage(response.message);
    } else {
      const signInResult = await signInUser({
        email: data.email,
        password: data.password,
      });

      if (signInResult.success) {
        router.replace("/");
      } else {
        setIsFormFailure(response.success);
        setFormResultMessage(response.message);
      }
    }
    setIsPending(false);
  };

  const handleRoleChange = (newRole: UserSignInOrSignUpRoles) => {
    setRole(newRole);
    setValue("role", newRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Connexion</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            className={
              role === UserRoles.PARTICIPANT || role === undefined
                ? "text-pink-400"
                : ""
            }
            onClick={() => handleRoleChange(UserRoles.PARTICIPANT)}
          >
            Participant
          </button>
          <button
            type="button"
            className={role === UserRoles.ORGANIZER ? "text-pink-400" : ""}
            onClick={() => handleRoleChange(UserRoles.ORGANIZER)}
          >
            Organisateur
          </button>
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
          <input type="hidden" value={role} />
          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            {isPending ? "Connexion ..." : "Se connecter"}
          </button>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
          {submittedForm && formResultMessage && (
            <p className={!isFormFailure ? "text-red-500" : ""}>
              {formResultMessage}
            </p>
          )}
        </form>
        <Link href="/auth/inscription">S&apos;inscrire</Link>
      </div>
    </div>
  );
};

export default SignInPage;
