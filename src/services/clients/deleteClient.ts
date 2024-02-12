import { apiClient } from "@/services/api.service";
import { useStorage } from "@/utils/useStorage";
import { ApiClientData } from "@/types/clients.types";
import router from "@/router";
import { handleErrors } from "@/utils/handleErrors";

export const deleteClient = async (clientId: number) => {
  const { get } = useStorage();

  try {
    if (!clientId) return;

    const token = get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    await apiClient.delete<ApiClientData>({
      url: `/clientes/${clientId}`,
      headers: { Authorization: token },
    });
  } catch (error) {
    handleErrors(error);
  }
};
