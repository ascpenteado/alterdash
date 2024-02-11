import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { getToken } from "../../utils/manageToken";

export const deleteProduct = async (productId: number) => {
  try {
    if (!productId) return;

    const token = getToken();
    if (!token) return;

    await apiClient.delete<ApiProduct>({
      url: `/produtos/${productId}`,
      headers: { Authorization: token },
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
