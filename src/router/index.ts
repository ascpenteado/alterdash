import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

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
        path: "/products",
        name: "products",
        component: () =>
          import(
            /* webpackChunkName: "products" */ "../views/ProductsView.vue"
          ),
      },
      {
        path: "/clients",
        name: "clients",
        component: () =>
          import(/* webpackChunkName: "clients" */ "../views/ClientsView.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "clients" */ "../views/ClientsView.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const isLoginPage = to.name === "login";

  if (!isAuthenticated && !isLoginPage) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
