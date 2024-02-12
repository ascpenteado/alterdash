import router from "@/router";
import { apiClient } from "@/services/api.service";
import { deleteClient } from "@/services/clients/deleteClient";
import { useStorage } from "@/utils/useStorage";

jest.mock("@/services/api.service", () => ({
  apiClient: {
    delete: jest.fn(),
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

describe("Clients - deleteClient", () => {
  test("should redirect user to login when token is not provided", async () => {
    // arrange
    const routerPushMock = jest.mocked(router.push);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });

    // act
    await deleteClient(1);

    // assert
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  test("should not call apiClient.delete when clientId is not provided", async () => {
    // arrange
    const apiClientMock = jest.mocked(apiClient.delete);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    // act
    await deleteClient(0);

    // assert
    expect(apiClientMock).not.toHaveBeenCalled();
  });

  test("should call apiClient.delete when clientId is provided", async () => {
    // arrange
    const apiClientMock = jest.mocked(apiClient.delete);
    const useStorageMock = useStorage as jest.Mock;
    useStorageMock.mockReturnValue({
      get: jest.fn().mockReturnValue("mockToken"),
    });

    // act
    await deleteClient(1);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      url: "/clientes/1",
      headers: { Authorization: "mockToken" },
    });
  });
});
