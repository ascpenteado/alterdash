import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
