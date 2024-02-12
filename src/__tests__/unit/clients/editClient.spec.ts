import router from "@/router";
import { apiClient } from "@/services/api.service";
import { editClient } from "@/services/clients/editClient";
import { ApiClientData } from "@/types/clients.types";
import { useStorage } from "@/utils/useStorage";

jest.mock("@/services/api.service", () => ({
  apiClient: {
    put: jest.fn(),
  },
}));

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

jest.mock("@/utils/useStorage", () => ({
  useStorage: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue("mockToken"),
  }),
}));

describe("Clients - editClient", () => {
  const client: ApiClientData = {
    id: 3,
    nome: "Severino",
    cpfOuCnpj: "12345678903",
    email: "severino@exemplo.com",
    telefone: "21999887744",
    idUsuario: 1,
    dataCadastro: "2022-01-15T18:39:00.540Z",
  };
  test("should redirect user to login when token is not provided", async () => {
    // arrange
    const routerPushMock = jest.mocked(router.push);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });

    // act
    await editClient(client);

    // assert
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  test("should not call api when clientId is not provided", async () => {
    // arrange
    const apiClientMock = jest.mocked(apiClient.put);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    const clientWithoutId = {
      ...client,
      id: undefined,
    };

    // act
    await editClient(clientWithoutId as unknown as ApiClientData);

    // assert
    expect(apiClientMock).not.toHaveBeenCalled();
  });

  test("should update client when client and token are provided", async () => {
    // arrange
    const apiClientMock = jest.mocked(apiClient.put);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    // act
    await editClient(client);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      headers: { Authorization: "mockToken" },
      url: `/clientes/${client.id}`,
      data: client,
    });
  });
});
