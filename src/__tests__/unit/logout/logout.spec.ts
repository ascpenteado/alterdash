import { logout } from "../../../services/logout";
import router from "../../../router";
import { useLocalStorageMock } from "../../../utils/useLocalStorageMock";

useLocalStorageMock();
jest.mock("../../../router");

describe("logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should remove token from localStorage and redirect to '/login' if there is a token", async () => {
    localStorage.setItem("token", "mockedToken");
    const pushSpy = jest.spyOn(router, "push");

    await logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(pushSpy).toHaveBeenCalledWith("/login");
  });
});
