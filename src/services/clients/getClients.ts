import router from "@/router";
import { useStorage } from "@/utils/useStorage";
import { apiClient } from "@/services/api.service";
import { ApiClientData } from "@/types/clients.types";
import { handleErrors } from "@/utils/handleErrors";

export async function getClients() {
  const { get } = useStorage();

  try {
    const token = get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    return await apiClient.get<ApiClientData[]>({
      url: "/clientes",
      headers: { Authorization: token },
    });
  } catch (error) {
    handleErrors(error);
  }
}
