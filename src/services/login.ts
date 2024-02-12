import store, { SnackbarMutation, UserMutation } from "@/store";
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
      store.commit(UserMutation.SetEmail, res.usuario.email);
      store.commit(UserMutation.SetName, res.usuario.nome);
      store.commit(UserMutation.SetPhoto, res.usuario.foto);
      setToken(res.token);
      localStorage.setItem("id", res.usuario.id.toString());
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
