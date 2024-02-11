import router from "@/router";
import { ApiProduct } from "@/types/product.types";
import { getToken, removeToken } from "@/utils/manageToken";
import { apiClient } from "@/services/api.service";

export async function getProducts() {
  try {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    return await apiClient.get<ApiProduct[]>({
      url: "/produtos",
      headers: { Authorization: token },
    });
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).response.status === 401) {
      removeToken();
      router.push("/login");
    }
  }
}
