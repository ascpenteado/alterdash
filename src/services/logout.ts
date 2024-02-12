import { removeToken } from "../utils/manageToken";

export const logout = async () => {
  removeToken();
  localStorage.removeItem("id");
  localStorage.removeItem("theme");
  window.location.href = "/login";
};
