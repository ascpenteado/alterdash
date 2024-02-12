import router from "@/router";
import { apiClient } from "@/services/api.service";
import { createClient } from "@/services/clients/createClient";
import { useStorage } from "@/utils/useStorage";

jest.mock("@/services/api.service", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
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

describe("Clients - createClient", () => {
  const payload = {
    nome: "Severino",
    cpfOuCnpj: "12345678903",
    email: "severino@exemplo.com",
    telefone: "21999887744",
    idUsuario: 1,
    dataCadastro: "2022-01-15T18:39:00.540Z",
  };

  const res = {
    id: 3,
    nome: "Severino",
    cpfOuCnpj: "12345678903",
    email: "severino@exemplo.com",
    telefone: "21999887744",
    idUsuario: 1,
    dataCadastro: "2022-01-15T18:39:00.540Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should redirect user to login when token is not provided", async () => {
    // arrange
    const routerPushMock = jest.mocked(router.push);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });

    // act
    await createClient(payload);

    // assert
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  test("should create client when token is provided", async () => {
    // arrange
    const apiClientMock = jest.mocked(apiClient.post).mockResolvedValue(res);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    // act
    const client = await createClient(payload);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      url: "/clientes",
      data: payload,
      headers: { Authorization: "mockToken" },
    });
    expect(client).toEqual(res);
  });
});
