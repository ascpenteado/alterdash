import router from "@/router";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { useStorage } from "../../utils/useStorage";
import store, { SnackbarMutation } from "@/store";
import { handleErrors } from "@/utils/handleErrors";

type ProductPayload = Omit<ApiProduct, "id">;

export const createProduct = async (
  product: Omit<ApiProduct, "id" | "dataCadastro">
) => {
  const { get } = useStorage();

  try {
    const token = get("token");
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
        timeout: 1000,
      });
      router.push("/products");
    }
  } catch (error) {
    handleErrors(error);
  }
};
