import { logout } from "@/services/logout";
import router from "@/router";
import { useSessionStorareMock } from "@/utils/useSessionStorageMock";

useSessionStorareMock();
jest.mock("../../../router");

describe("logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("should remove token from sessionStorage and redirect to '/login' if there is a token", async () => {
    sessionStorage.setItem("token", "mockedToken");
    const pushSpy = jest.spyOn(router, "push");

    await logout();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith("token");
    expect(pushSpy).toHaveBeenCalledWith("/login");
  });
});
