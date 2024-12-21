import { UserRoles } from "@/types/auth";
import { z } from "zod";

const invalidEmailErrorMessage = "L'adresse email est invalide";
const minLengthErrorMessage =
  "Le mot de passe doit contenir au moins 8 caractères";
const maxLengthErrorMessage =
  "Le mot de passe doit contenir au maximum 20 caractères";
const numberErrorMessage = "Le mot de passe doit contenir au moins un chiffre";
const specialCharacterErrorMessage =
  "Le mot de passe doit contenir au moins un caractère spécial parmi ! @ # $ % ^ & *";
const confirmPasswordErrorMessage = "Les mots de passe ne correspondent pas";

const emailSchema = z.string().email({ message: invalidEmailErrorMessage });

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

const roleSchema = z.enum([UserRoles.PARTICIPANT, UserRoles.ORGANIZER], {
  message: "Rôle invalide",
});

export const GetSignUpInput = () =>
  z
    .object({
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: z.string(),
      role: roleSchema,
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: confirmPasswordErrorMessage,
      path: ["confirmPassword"],
    });

export type SignUpInput = z.infer<ReturnType<typeof GetSignUpInput>>;

export const GetSignInInput = () =>
  z.object({
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
  });

export type SignInInput = z.infer<ReturnType<typeof GetSignInInput>>;
