import { ApiProduct, Product } from "../../types/product.types";

export function buildProducts(products: ApiProduct[]): Product[] {
  return products.map((product) => ({
    ...product,
    valor: product.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    quantidadeEstoque: product.quantidadeEstoque,
    dataCadastro: new Date(product.dataCadastro).toLocaleDateString("pt-BR"),
  }));
}

export const productTableHeaders = [
  {
    text: "ID",
    value: "id",
  },
  {
    text: "Nome",
    value: "nome",
  },
  {
    text: "Valor",
    value: "valor",
  },
  {
    text: "Quantidade em estoque",
    value: "quantidadeEstoque",
  },
  {
    text: "Observações",
    value: "observacao",
  },
  {
    text: "Data de cadastro",
    value: "dataCadastro",
  },
  {
    text: "Ações",
    value: "actions",
    sortable: false,
  },
];
