import router from "@/router";
import { apiClient } from "@/services/api.service";
import { getClients } from "@/services/clients/getClients";
import { useStorage } from "@/utils/useStorage";

jest.mock("@/services/api.service", () => ({
  apiClient: {
    get: jest.fn(),
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

describe("Clients - getClients", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should redirect user to login when token is not provided", async () => {
    // arrange
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });

    const routerPushMock = jest.mocked(router.push);

    // act
    await getClients();

    // assert
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  test("should return clients when token is provided", async () => {
    // arrange
    const res = [
      {
        id: 1,
        nome: "Kadu Pereira",
        cpfOuCnpj: "12345678901",
        email: "jose@exemplo.com",
        telefone: "21999887766",
        idUsuario: 1,
        dataCadastro: "2024-02-12T20:37:45.409Z",
      },
      {
        id: 2,
        nome: "Camila Silva",
        cpfOuCnpj: "12345678902",
        email: "jose@exemplo.com",
        telefone: "21999887777",
        idUsuario: 1,
        dataCadastro: "2024-02-12T19:37:25.883Z",
      },
    ];
    const apiClientMock = jest.mocked(apiClient.get).mockResolvedValue(res);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    // act
    const clients = await getClients();

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      url: "/clientes",
      headers: { Authorization: "mockToken" },
    });
    expect(clients).toEqual(res);
  });
});
