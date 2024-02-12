import router from "@/router";
import { apiClient } from "@/services/api.service";
import { ApiProduct, Product } from "@/types/product.types";
import { useStorage } from "../../utils/useStorage";
import store, { SnackbarMutation } from "@/store";

type ProductPayload = Omit<Product, "id">;

export const editProduct = async (product: Product) => {
  const { get } = useStorage();

  try {
    if (!product.id) return;
    const token = get("token");
    if (!token) return;

    const payload: ProductPayload = {
      ...product,
      dataCadastro: new Date().toISOString(),
    };

    const res = await apiClient.put<ApiProduct, ProductPayload>({
      url: `/produtos/${product.id}`,
      headers: { Authorization: token },
      data: payload,
    });
    if (res.id) {
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Produto atualizado com sucesso",
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
