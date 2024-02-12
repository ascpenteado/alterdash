import router from "@/router";
import { ApiProduct } from "@/types/product.types";
import { useStorage } from "@/utils/useStorage";
import { apiClient } from "@/services/api.service";
import store, { SnackbarMutation } from "@/store";

export async function getProducts() {
  const { get } = useStorage();
  try {
    const token = get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    return await apiClient.get<ApiProduct[]>({
      url: "/produtos",
      headers: { Authorization: token },
    });
  } catch (error) {
    store.commit(SnackbarMutation.ShowSnackbar, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).response?.data.mensagem,
      color: "error",
    });
  }
}
