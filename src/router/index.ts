import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { productRoutes } from "./product.routes";
import { useStorage } from "../utils/useStorage";
import { validateMD5Hash } from "../utils/validateMd5Hash";
import { clientRoutes } from "./client.routes";

Vue.use(VueRouter);
const { get } = useStorage();

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
      },
      ...clientRoutes,
      ...productRoutes,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({ routes, mode: "history" });

router.beforeEach((to, _, next) => {
  const token = get("token") ?? "";
  const isAuthenticated = validateMD5Hash(token);
  const isLoginPage = to.name === "login";

  if (!isAuthenticated && !isLoginPage) {
    next({ name: "login" });
  } else if (isAuthenticated && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
