import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { getToken } from "../../utils/manageToken";

export const getProductById = async (productId: string) => {
  try {
    const token = getToken();
    if (!token) return;

    const id = parseInt(productId);

    const res = await apiClient.get<ApiProduct>({
      url: `/produtos/${id}`,
      headers: { Authorization: token },
    });
    if (res.id) return res;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
