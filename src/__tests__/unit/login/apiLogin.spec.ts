import router from "@/router";
import { apiClient } from "@/services/api.service";
import { apiLogin } from "@/services/login";
import store, { SnackbarMutation } from "@/store";

jest.mock("@/services/api.service", () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("Login", () => {
  test("should login successfully when valid email and password are provided", async () => {
    // arrange
    const email = "test@example.com";
    const password = "password123";
    const res = {
      token: "token123",
      usuario: {
        email: "test@example.com",
        nome: "Test User",
        foto: "user.jpg",
        id: 1,
      },
    };
    const apiClientMock = jest.mocked(apiClient.post).mockResolvedValue(res);

    // act
    await apiLogin(email, password);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      data: { email, senha: password },
      url: "/login",
    });
  });

  test("should redirect user to home after successfully login", async () => {
    // arrange
    const email = "test@example.com";
    const password = "password123";
    const res = {
      token: "token123",
      usuario: {
        email: "test@example.com",
        nome: "Test User",
        foto: "user.jpg",
        id: 1,
      },
    };
    const apiClientMock = jest.mocked(apiClient.post).mockResolvedValue(res);
    const routerPushMock = jest.mocked(router.push);

    // act
    await apiLogin(email, password);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      data: { email, senha: password },
      url: "/login",
    });
    expect(routerPushMock).toHaveBeenCalledWith("/");
  });

  test("should set user data in store when login is successful", async () => {
    // arrange
    const email = "test@example.com";
    const password = "password123";
    const res = {
      token: "token123",
      usuario: {
        email: "test@example.com",
        nome: "Test User",
        foto: "user.jpg",
        id: 1,
      },
    };
    const apiClientMock = jest.mocked(apiClient.post).mockResolvedValue(res);

    // act
    await apiLogin(email, password);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      data: { email, senha: password },
      url: "/login",
    });

    expect(store.state.user.email).toBe(res.usuario.email);
    expect(store.state.user.nome).toBe(res.usuario.nome);
    expect(store.state.user.foto).toBe(res.usuario.foto);
  });

  test("should set 'token' and 'id' into localStorage after login", async () => {
    // arrange
    const email = "test@example.com";
    const password = "password123";
    const res = {
      token: "token123",
      usuario: {
        email: "test@example.com",
        nome: "Test User",
        foto: "user.jpg",
        id: 1,
      },
    };
    const apiClientMock = jest.mocked(apiClient.post).mockResolvedValue(res);

    // act
    await apiLogin(email, password);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      data: { email, senha: password },
      url: "/login",
    });

    expect(localStorage.getItem("token")).toBe(res.token);
    expect(localStorage.getItem("id")).toBe(res.usuario.id.toString());
  });

  test("should show error message when login fails", async () => {
    // arrange
    const email = "test@example.com";
    const password = "password123";
    const error = {
      response: {
        data: {
          mensagem: "Senha ou email inválidos",
        },
      },
    };
    const apiClientMock = jest.mocked(apiClient.post).mockRejectedValue(error);
    const storeCommitMock = jest.spyOn(store, "commit");

    // act
    await apiLogin(email, password);

    // assert
    expect(apiClientMock).toHaveBeenCalledWith({
      data: { email, senha: password },
      url: "/login",
    });

    expect(storeCommitMock).toHaveBeenCalledWith(
      SnackbarMutation.ShowSnackbar,
      {
        message: "Senha ou email inválidos",
        color: "error",
      }
    );

    expect(storeCommitMock).toHaveBeenCalledTimes(1);
  });
});
