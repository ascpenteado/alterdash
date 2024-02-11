import { apiLogin } from "@/services/login";
import { apiClient } from "@/services/api.service";
import router from "@/router";
import { bindMockToWindow, storageMock } from "@/utils/useStorageMock";

bindMockToWindow("localStorage");

jest.mock("../../../services/api.service");
jest.mock("../../../router");

describe("apiLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storageMock.clear();
  });

  it("should call apiClient.post with correct parameters", async () => {
    const postSpy = jest
      .spyOn(apiClient, "post")
      .mockResolvedValueOnce({ token: "mockedToken" });

    await apiLogin("test@example.com", "password");

    expect(postSpy).toHaveBeenCalledWith("/login", {
      email: "test@example.com",
      senha: "password",
    });
  });

  it("should set token in localStorage and redirect to '/' if login is successful", async () => {
    jest
      .spyOn(apiClient, "post")
      .mockResolvedValueOnce({ token: "mockedToken" });
    const pushSpy = jest.spyOn(router, "push");

    await apiLogin("test@example.com", "password");

    expect(storageMock.setItem).toHaveBeenCalledWith("token", "mockedToken");
    expect(pushSpy).toHaveBeenCalledWith("/");
  });

  it("should not set token in localStorage or redirect if login fails", async () => {
    jest.spyOn(apiClient, "post").mockResolvedValueOnce(null);
    const pushSpy = jest.spyOn(router, "push");

    await apiLogin("test@example.com", "password");

    expect(storageMock.setItem).not.toHaveBeenCalled();
    expect(pushSpy).not.toHaveBeenCalled();
  });
});
