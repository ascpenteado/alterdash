import router from "@/router";
import { apiClient } from "@/services/api.service";
import { useStorage } from "@/utils/useStorage";
import { ApiClientData } from "@/types/clients.types";
import store, { SnackbarMutation } from "@/store";
import { handleErrors } from "@/utils/handleErrors";

type ClientPayload = Omit<ApiClientData, "id">;

export const createClient = async (client: Omit<ApiClientData, "id">) => {
  const { get } = useStorage();
  try {
    const token = get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload: ClientPayload = {
      ...client,
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
      return res;
    }
  } catch (error) {
    handleErrors(error);
  }
};
