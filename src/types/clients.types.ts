export type ApiClient = {
  id: number;
  nome: string;
  cpfOuCnpj: string;
  email: string;
  telefone: string;
  idUsuario: number;
  dataCadastro: string;
};

export const ClientTableHeaders = {
  id: "ID",
  nome: "Nome",
  cpfOuCnpj: "CPF/CNPJ",
  email: "E-mail",
  telefone: "Telefone",
  dataCadastro: "Data de Cadastro",
  idUsuario: "ID do Usuário",
} as const;

export type ClientTableHeadersType = keyof typeof ClientTableHeaders;
