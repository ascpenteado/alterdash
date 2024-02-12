import { useStorage } from "../utils/useStorage";

export const logout = async () => {
  const { remove } = useStorage();
  remove("token");
  localStorage.removeItem("id");
  localStorage.removeItem("theme");
  window.location.href = "/login";
};
