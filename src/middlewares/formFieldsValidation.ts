import { z } from "zod";

export async function formFieldsValidation(
  form: Record<string, unknown>,
  schema: z.ZodSchema
): Promise<{ message: string; status: number }> {
  try {
    await schema.parseAsync(form);
    return { message: "Données valides", status: 200 };
  } catch (error) {
    if (error instanceof z.ZodError)
      return {
        message: "Erreur sur le format des données du formulaire",
        status: 422,
      };
    else {
      return { message: "Une erreur inconnue est survenue", status: 500 };
    }
  }
}
