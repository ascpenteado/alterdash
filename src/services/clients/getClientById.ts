import { apiClient } from "@/services/api.service";
import { useStorage } from "../../utils/useStorage";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";

export const getClientById = async (clientId: string) => {
  const { get } = useStorage();

  try {
    const token = get("token");
    if (!token) return;

    const id = parseInt(clientId);

    const res = await apiClient.get<ApiClientData>({
      url: `/clientes/${id}`,
      headers: { Authorization: token },
    });
    if (res.id) return res;
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
