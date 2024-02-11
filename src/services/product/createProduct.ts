import router from "@/router";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { getToken } from "../../utils/manageToken";

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
      showSnackbar("Produto criado com sucesso", "success");
      router.push("/products");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
