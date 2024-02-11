import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { getToken } from "@/utils/manageToken";
import { ApiClientData } from "@/types/clients.types";

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
      showSnackbar("Cliente criado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
