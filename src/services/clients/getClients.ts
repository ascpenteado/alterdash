import router from "@/router";
import { getToken, removeToken } from "@/utils/manageToken";
import { apiClient } from "@/services/api.service";
import { ApiClientData } from "@/types/clients.types";

export async function getClients() {
  try {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    return await apiClient.get<ApiClientData[]>({
      url: "/clientes",
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
