import router from "@/router";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { getToken } from "../../utils/manageToken";
import store, { SnackbarMutation } from "@/store";

type ProductPayload = Omit<ApiProduct, "id">;

export const createProduct = async (
  product: Omit<ApiProduct, "id" | "dataCadastro">
) => {
  try {
    const token = getToken();
    if (!token) return;

    const payload: ProductPayload = {
      ...product,
      dataCadastro: new Date().toISOString(),
    };

    const res = await apiClient.post<ApiProduct, ProductPayload>({
      url: "/produtos",
      headers: { Authorization: token },
      data: payload,
    });
    if (res.id) {
      store.commit(SnackbarMutation.ShowSnackbar, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: "Produto criado com sucesso",
        color: "success",
      });
      router.push("/products");
    }
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
