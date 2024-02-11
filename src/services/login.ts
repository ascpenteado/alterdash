import router from "../router";
import { showSnackbar } from "../store/snackBar/snackBar.state";
import { ObjetoUsuario } from "../types/users.types";
import { setToken } from "../utils/manageToken";
import { apiClient } from "./api.service";

type LoginPayload = {
  email: string;
  senha: string;
};

export const apiLogin = async (email: string, password: string) => {
  try {
    const res = await apiClient.post<ObjetoUsuario, LoginPayload>({
      url: "/login",
      data: {
        email,
        senha: password,
      },
    });

    if (res.token) {
      setToken(res.token);
      router.push("/");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).code === "ERR_NETWORK") {
      showSnackbar("Erro de conexão com a API", "error");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
