import router from "../router";
import { showSnackbar } from "../store/snackBar/snackBar.state";
import { ObjetoUsuario } from "../types/api.types";
import { apiClient } from "./api.service";

export const apiLogin = async (email: string, password: string) => {
  try {
    const res = await apiClient.post<ObjetoUsuario>("/login", {
      email,
      senha: password,
    });
    if (res.token) {
      localStorage.setItem("token", res.token);
      router.push("/");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
