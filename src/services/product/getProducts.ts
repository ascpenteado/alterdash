import router from "../../router";
import { ApiProduct } from "../../types/product.types";
import { apiClient } from "../api.service";

export async function getProducts(token: string) {
  if (!token) {
    return;
  }

  try {
    return await apiClient.get<ApiProduct[]>("/produtos");
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).response.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }
}