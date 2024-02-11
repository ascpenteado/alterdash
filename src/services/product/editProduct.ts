import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct, Product } from "@/types/product.types";
import { getToken } from "../../utils/manageToken";

type ProductPayload = Omit<Product, "id">;

export const editProduct = async (product: Product) => {
  try {
    if (!product.id) return;
    const token = getToken();
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
      showSnackbar("Produto atualizado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
