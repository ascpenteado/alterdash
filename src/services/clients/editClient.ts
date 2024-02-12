import router from "@/router";
import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";

type ClientPayload = Omit<ApiClientData, "id">;

export const editProduct = async (client: ApiClientData) => {
  try {
    if (!client.id) return;
    const token = getToken();
    if (!token) return;

    const payload: ClientPayload = {
      ...client,
      dataCadastro: new Date().toISOString(),
    };

    const res = await apiClient.put<ApiClientData, ClientPayload>({
      url: `/produtos/${client.id}`,
      headers: { Authorization: token },
      data: payload,
    });
    if (res.id) {
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Produto atualizado com sucesso",
        color: "success",
      });

      router.push("/products");
    }
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
