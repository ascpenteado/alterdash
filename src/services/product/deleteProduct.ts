import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { useStorage } from "../../utils/useStorage";
import store, { SnackbarMutation } from "@/store";

export const deleteProduct = async (productId: number) => {
  const { get } = useStorage();

  try {
    if (!productId) return;

    const token = get("token");
    if (!token) return;

    await apiClient.delete<ApiProduct>({
      url: `/produtos/${productId}`,
      headers: { Authorization: token },
    });
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
