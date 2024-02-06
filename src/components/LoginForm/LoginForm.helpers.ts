export const validateLoginFormFields = (email: string, password: string) => {
  const errors: string[] = [];
  if (!email) errors.push("O email é obrigatório");
  if (!password) errors.push("A senha é obrigatória");
  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
    errors.push("Email inválido");
  return errors;
};
