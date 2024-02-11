import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";

export const deleteProduct = async (productId: number) => {
  try {
    if (productId) return;

    const res = await apiClient.delete<ApiProduct>(`/produtos/${productId}`);
    if (res.id) return res;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
