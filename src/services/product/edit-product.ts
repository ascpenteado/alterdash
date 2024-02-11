import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct, Product } from "@/types/product.types";

type ProductPayload = Omit<Product, "id">;

export const editProduct = async (product: Product) => {
  try {
    if (!product.id) return;

    const payload: ProductPayload = {
      ...product,
      dataCadastro: new Date().toISOString(),
    };

    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };

    const res = await apiClient.put<ApiProduct, ProductPayload>(
      `/produtos/${product.id}`,
      payload,
      headers
    );
    if (res.id) {
      showSnackbar("Produto atualizado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
