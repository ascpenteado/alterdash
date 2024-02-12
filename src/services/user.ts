import { getToken } from "@/utils/manageToken";
import { apiClient } from "./api.service";
import { Usuario } from "@/types/users.types";
import store, { SnackbarMutation } from "@/store";

export const getUserById = async (id: number) => {
  if (!id) return;

  const token = getToken();

  try {
    const res = await apiClient.get<Usuario>({
      url: `/usuarios/${id}`,
      headers: { Authorization: token ?? "" },
    });

    return res;
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
