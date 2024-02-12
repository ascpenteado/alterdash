import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";

export const deleteClient = async (clientId: number) => {
  try {
    if (!clientId) return;

    const token = getToken();
    if (!token) return;

    await apiClient.delete<ApiClientData>({
      url: `/clientes/${clientId}`,
      headers: { Authorization: token },
    });
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
