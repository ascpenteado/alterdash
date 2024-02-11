import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";

export const getProductById = async (productId: string) => {
  try {
    const id = parseInt(productId);

    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };

    const res = await apiClient.get<ApiProduct>(
      `/produtos/${id}`,
      null,
      headers
    );
    if (res.id) {
      return res;
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSnackbar((error as any).response?.data.mensagem, "error");
  }
};
