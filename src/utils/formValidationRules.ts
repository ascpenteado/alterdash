export const formValidationRules = {
  required: (value: string) => !!value || "Campo obrigatório",
  shouldBeNumber: (value: string) =>
    !isNaN(parseFloat(value)) || "Valor deve ser numérico",
  positivePrice: (value: string) =>
    parseFloat(value) > 0 || "Valor deve ser positivo",
  minLength: (value: string) => value?.length >= 3 || "Mínimo de 3 caracteres",
  maxLength: (value: string) =>
    value?.length <= 255 || "Máximo de 255 caracteres",
  cpfOrCnpj: (value: string) => {
    if (value.length === 11) {
      return true;
    }
    if (value.length === 14) {
      return true;
    }
    return "CPF ou CNPJ inválido";
  },
};
