import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { productRoutes } from "./product.routes";
import { getToken } from "../utils/manageToken";
import { validateMD5Hash } from "../utils/validateMd5Hash";
import { clientRoutes } from "./client.routes";

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
];

const router = new VueRouter({ routes });

router.beforeEach((to, _, next) => {
  const token = getToken() ?? "";
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
