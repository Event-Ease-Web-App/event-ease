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

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const signUpSchema = z
  .object({
    email: z.string().email({ message: invalidEmailErrorMessage }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: confirmPasswordErrorMessage,
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: invalidEmailErrorMessage }),
  password: passwordSchema,
});
