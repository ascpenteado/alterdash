import router from "@/router";
import { apiClient } from "@/services/api.service";
import { useStorage } from "@/utils/useStorage";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";

type ClientPayload = Omit<ApiClientData, "id">;

export const editClient = async (client: ApiClientData) => {
  const { get } = useStorage();

  try {
    if (!client.id) return;
    const token = get("token");
    if (!token) return;

    const payload: ClientPayload = {
      ...client,
      dataCadastro: new Date().toISOString(),
    };

    const res = await apiClient.put<ApiClientData, ClientPayload>({
      url: `/clientes/${client.id}`,
      headers: { Authorization: token },
      data: payload,
    });
    if (res.id) {
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Cliente atualizado com sucesso",
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
