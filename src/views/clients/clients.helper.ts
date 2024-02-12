import { ApiClientData } from "@/types/clients.types";
import { Mask } from "maska";

export const formatClients = (clients: ApiClientData[]) => {
  const cpfCnpjMask = new Mask({
    mask: ["###.###.###-##", "##.###.###/####-##"],
  });
  const phoneMask = new Mask({ mask: ["(##) ####-####", "(##) #####-####"] });

  return clients.map((client) => {
    return {
      ...client,
      cpfOuCnpj: cpfCnpjMask.masked(client.cpfOuCnpj),
      telefone: phoneMask.masked(client.telefone),
    };
  });
};
export const clientsTableHeaders = [
  {
    text: "ID",
    value: "id",
  },
  {
    text: "ID do usuário",
    value: "idUsuario",
  },
  {
    text: "Nome",
    value: "nome",
  },
  {
    text: "CPF/CNPJ",
    value: "cpfOuCnpj",
  },
  {
    text: "Email",
    value: "email",
  },
  {
    text: "Telefone",
    value: "telefone",
  },
  {
    text: "Ações",
    value: "actions",
    sortable: false,
  },
];
