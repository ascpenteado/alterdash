import store, { SnackbarMutation } from "@/store";
import { useStorage } from "../utils/useStorage";
import { apiClient } from "./api.service";
import router from "@/router";

export const logout = async () => {
  const { remove, get } = useStorage();

  const token = get("token");

  if (!token) return;

  try {
    await apiClient.delete({
      url: "/logout",
      headers: {
        Authorization: token,
      },
    });

    remove("token");
    remove("id");
    remove("theme");
    router.go(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      message: error.response?.data.mensagem,
      color: "error",
    });
  }
};
