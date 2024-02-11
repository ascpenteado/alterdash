import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { productRoutes } from "./product.routes";
import { getToken } from "../utils/manageToken";
import { validateMD5Hash } from "../utils/validateMd5Hash";

Vue.use(VueRouter);

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
          import(/* webpackChunkName: "profile" */ "../views/ClientsView.vue"),
      },
      {
        path: "/clients",
        name: "clients",
        component: () =>
          import(/* webpackChunkName: "clients" */ "../views/ClientsView.vue"),
      },
      ...productRoutes,
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, _, next) => {
  const token = getToken() ?? "";
  const isAuthenticated = validateMD5Hash(token);
  const isLoginPage = to.name === "login";

  if (!isAuthenticated && !isLoginPage) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
