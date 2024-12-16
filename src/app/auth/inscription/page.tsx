"use client";
import { useState } from "react";
import { signUpSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { SignUpFormData } from "@/types/forms";
import axios from "axios";
import { API_ENDPOINTS } from "@/constants/api";

const SignUp = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsPending(true);

    try {
      await signUpSchema.parseAsync(formData);
      setErrors({});

      const response = await axios.post(
        API_ENDPOINTS.USER_CHECK_SIGNUP,
        formData
      );
      console.log("response:", response);
      toast({
        title: "Succès",
        description: "Vous allez recevoir un email de validation",
      });
      setFormData({} as SignUpFormData);
      console.log("User created successfully");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Erreur",
          description: "Veuillez vérifier à nouveau les champs",
          variant: "destructive",
        });
      } else {
        console.log(error.response.data);
        toast({
          title: error.response.data.error,
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Inscription</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            {isPending ? "Inscription ..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
