export const formValidationRules = {
  email: (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value) || "E-mail inválido";
  },
  phone: (value: string) => {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(value) || "Telefone inválido";
  },
  required: (value: string) => !!value || "Campo obrigatório",
  shouldBePositiveInteger: (value: string) =>
    parseInt(value) > 0 || "O valor deve ser um número positivo",
  shouldBeNumber: (value: string) =>
    !isNaN(parseFloat(value)) || "O valor deve ser numérico",
  positivePrice: (value: string) =>
    parseFloat(value) > 0 || "O valor deve ser positivo",
  minLength: (value: string) => value?.length >= 3 || "Mínimo de 3 caracteres",
  maxLength: (value: string) =>
    value?.length <= 255 || "Máximo de 255 caracteres",
  cpfOuCnpj: (value: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    return (
      cpfRegex.test(value) || cnpjRegex.test(value) || "CPF ou CNPJ inválido"
    );
  },
};
