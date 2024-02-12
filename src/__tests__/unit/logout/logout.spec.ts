import router from "@/router";
import { apiClient } from "@/services/api.service";
import { logout } from "@/services/logout";

jest.mock("../../../services/api.service.ts", () => ({
  apiClient: {
    delete: jest.fn(),
  },
}));

jest.mock("../../../utils/useStorage.ts", () => ({
  useStorage: jest.fn().mockReturnValue({
    remove: jest.fn(),
    get: jest.fn().mockReturnValue("mocked-token"),
  }),
}));

jest.mock("../../../router", () => ({
  go: jest.fn(),
}));

describe("Logout", () => {
  test("should logout successfully", async () => {
    const logoutRes = {
      mensagem: "Logout efetuado com sucesso!",
    };
    const apiClientMock = jest
      .mocked(apiClient.delete)
      .mockResolvedValue(logoutRes);

    await logout();

    expect(apiClientMock).toHaveBeenCalledWith({
      url: "/logout",
      headers: {
        Authorization: "mocked-token",
      },
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("id")).toBeNull();
    expect(localStorage.getItem("theme")).toBeNull();
    expect(router.go).toHaveBeenCalledWith(0);
  });
});
