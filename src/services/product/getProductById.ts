import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { useStorage } from "../../utils/useStorage";
import store, { SnackbarMutation } from "@/store";

export const getProductById = async (productId: string) => {
  try {
    const { get } = useStorage();
    const token = get("token");
    if (!token) return;

    const id = parseInt(productId);

    const res = await apiClient.get<ApiProduct>({
      url: `/produtos/${id}`,
      headers: { Authorization: token },
    });
    if (res.id) return res;
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
};
