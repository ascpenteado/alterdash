import router from "@/router";
import store, { SnackbarMutation } from "@/store";
import { useStorage } from "./useStorage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrors = (error: any) => {
  const { remove } = useStorage();
  if (error.code) {
    if (error.code === "ERR_NETWORK") {
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Erro de conexão com a API",
        color: "error",
      });
      remove("token");
      return;
    }

    store.commit(SnackbarMutation.ShowSnackbar, {
      message: error.message,
      color: "error",
    });

    remove("token");
  }

  store.commit(SnackbarMutation.ShowSnackbar, {
    message: error.response?.data.mensagem,
    color: "error",
  });
};
