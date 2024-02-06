import { validateLoginFormFields } from "../../../components/LoginForm/LoginForm.helpers";

describe("validateLoginFormFields", () => {
  it("should return an empty array when email and password are valid", () => {
    const email = "test@example.com";
    const password = "password123";
    const result = validateLoginFormFields(email, password);
    expect(result).toEqual([]);
  });

  it("should return an array with error message when email is missing", () => {
    const email = "";
    const password = "password123";
    const result = validateLoginFormFields(email, password);
    expect(result).toEqual(["O email é obrigatório", "Email inválido"]);
  });

  it("should return an array with error message when password is missing", () => {
    const email = "test@example.com";
    const password = "";
    const result = validateLoginFormFields(email, password);
    expect(result).toEqual(["A senha é obrigatória"]);
  });

  it("should return an array with error message when email is not a valid", () => {
    const email = "123123";
    const password = "password123";
    const result = validateLoginFormFields(email, password);
    expect(result).toEqual(["Email inválido"]);
  });
});
