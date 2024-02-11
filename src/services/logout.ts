import router from "../router";
import { removeToken } from "../utils/manageToken";

export const logout = async () => {
  removeToken();
  router.push("/login");
};
