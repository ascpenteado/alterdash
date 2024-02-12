import { useStorage } from "@/utils/useStorage";
import { apiClient } from "./api.service";
import { Usuario } from "@/types/users.types";
import store, { SnackbarMutation } from "@/store";

export const getUserById = async (id: number) => {
  const { get } = useStorage();

  if (!id) return;

  const token = get("token");

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
