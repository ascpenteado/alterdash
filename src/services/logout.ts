import router from "../router";
import { removeToken } from "../utils/manageToken";

export const logout = async () => {
  removeToken();
  localStorage.removeItem("id");
  router.push("/login");
};
