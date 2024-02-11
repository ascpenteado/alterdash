import { logout } from "@/services/logout";
import router from "@/router";
import { bindMockToWindow, storageMock } from "@/utils/useStorageMock";

bindMockToWindow("localStorage");
jest.mock("../../../router");

describe("logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storageMock.clear();
  });

  it("should remove token from localStorage and redirect to '/login' if there is a token", async () => {
    storageMock.setItem("token", "mockedToken");
    const pushSpy = jest.spyOn(router, "push");

    await logout();

    expect(storageMock.removeItem).toHaveBeenCalledWith("token");
    expect(pushSpy).toHaveBeenCalledWith("/login");
  });
});
