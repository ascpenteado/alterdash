import store, { SnackbarMutation } from "@/store";
import router from "../router";

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
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Erro de conexão com a API",
        color: "error",
      });
      return;
    }
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
