import router from "../router";

export const logout = async () => {
  localStorage.removeItem("token");
  router.push("/login");
};
