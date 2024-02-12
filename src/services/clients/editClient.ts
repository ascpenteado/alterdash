import router from "@/router";
import { apiClient } from "@/services/api.service";
import { useStorage } from "@/utils/useStorage";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";
import { handleErrors } from "@/utils/handleErrors";

type ClientPayload = Omit<ApiClientData, "id">;

export const editClient = async (client: ApiClientData) => {
  const { get } = useStorage();

  try {
    if (!client.id) return;

    const token = get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload: ClientPayload = {
      ...client,
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
    handleErrors(error);
  }
};
