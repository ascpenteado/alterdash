import { apiClient } from "@/services/api.service";
import { ApiClientData } from "@/types/clients.types";
import { handleErrors } from "@/utils/handleErrors";
import { useStorage } from "../../utils/useStorage";

export const getClientById = async (clientId: string) => {
  const { get } = useStorage();

  try {
    const token = get("token");
    if (!token) return;

    const id = parseInt(clientId);

    const res = await apiClient.get<ApiClientData>({
      url: `/clientes/${id}`,
      headers: { Authorization: token },
    });
    if (res.id) return res;
  } catch (error) {
    handleErrors(error);
  }
};
