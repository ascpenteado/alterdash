import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { getToken } from "../../utils/manageToken";
import { ApiClientData } from "@/types/clients.types";

export const getClientById = async (clientId: string) => {
  try {
    const token = getToken();
    if (!token) return;

    const id = parseInt(clientId);

    const res = await apiClient.get<ApiClientData>({
      url: `/clientes/${id}`,
      headers: { Authorization: token },
    });
    if (res.id) return res;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
