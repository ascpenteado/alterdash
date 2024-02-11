import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";

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
      showSnackbar("Produto atualizado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
