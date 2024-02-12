import router from "@/router";
import { apiClient } from "@/services/api.service";
import { ApiProduct } from "@/types/product.types";
import { handleErrors } from "@/utils/handleErrors";
import { useStorage } from "@/utils/useStorage";

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
    handleErrors(error);
  }
}
