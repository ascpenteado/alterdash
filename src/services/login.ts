import store, { UserMutation } from "@/store";
import router from "../router";

import { handleErrors } from "@/utils/handleErrors";
import { ObjetoUsuario } from "../types/users.types";
import { useStorage } from "../utils/useStorage";
import { apiClient } from "./api.service";

type LoginPayload = {
  email: string;
  senha: string;
};

export const apiLogin = async (email: string, password: string) => {
  const { set } = useStorage();
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

      set("token", res.token);
      set("id", res.usuario.id.toString());

      router.push("/");
    }
  } catch (error) {
    handleErrors(error);
  }
};
