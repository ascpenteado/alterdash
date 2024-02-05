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

const hasToken = localStorage.getItem("token") !== null;

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !hasToken) next({ name: "login" });
  else next();
});

export default router;
