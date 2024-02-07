export type ApiProduct = {
  dataCadastro: string;
  id: number;
  nome: string;
  observacao: string;
  quantidadeEstoque: number;
  valor: number;
};

export type Product = {
  valor: string;
  dataCadastro: string;
  id: number;
  nome: string;
  observacao: string;
  quantidadeEstoque: number;
};

export const ProductTableHeaders = {
  id: "ID",
  nome: "Nome",
  valor: "Valor",
  quantidadeEstoque: "Quantidade em Estoque",
  dataCadastro: "Data de Cadastro",
  observacao: "Observação",
} as const;

export type ProductTableHeadersType = keyof typeof ProductTableHeaders;
