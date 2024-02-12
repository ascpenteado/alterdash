import router from "@/router";
import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";

type ClientPayload = Omit<ApiClientData, "id">;

export const createClient = async (
  product: Omit<ApiClientData, "id" | "dataCadastro">
) => {
  try {
    const token = getToken();
    if (!token) return;

    const payload: ClientPayload = {
      ...product,
      dataCadastro: new Date().toISOString(),
    };

    const res = await apiClient.post<ApiClientData, ClientPayload>({
      url: "/clientes",
      headers: { Authorization: token },
      data: payload,
    });
    if (res.id) {
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Cliente criado com sucesso",
        color: "success",
      });
      router.push("/clients");
    }
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
