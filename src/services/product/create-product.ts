import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";

type ProductPayload = Omit<ApiProduct, "id">;

export const createProduct = async (
  product: Omit<ApiProduct, "id" | "dataCadastro">
) => {
  try {
    const payload: ProductPayload = {
      ...product,
      dataCadastro: new Date().toISOString(),
    };

    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };

    const res = await apiClient.post<ApiProduct, ProductPayload>(
      "/produtos",
      payload,
      headers
    );
    if (res.id) {
      showSnackbar("Produto criado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
