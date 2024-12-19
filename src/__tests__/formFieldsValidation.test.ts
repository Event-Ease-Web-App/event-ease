import { formFieldsValidation } from "../middlewares/formFieldsValidation";
import { GetSignInInput } from "../lib/schemas/forms";

describe("formFieldsValidation", () => {
  it("should return status 200 for valid data", async () => {
    const validForm = { email: "test@example.com", password: "123456a!!" };
    const result = await formFieldsValidation(validForm, GetSignInInput());
    expect(result).toEqual({ message: "Données valides", status: 200 });
  });

  it("should return status 422 for invalid data", async () => {
    const invalidForm = { email: "invalid", password: "123" };
    const result = await formFieldsValidation(invalidForm, GetSignInInput());
    expect(result).toEqual({
      message: "Erreur sur le format des données du formulaire",
      status: 422,
    });
  });
});
