import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/ProductsView.vue"),
  },
  {
    path: "/clients",
    name: "clients",
    component: () =>
      import(/* webpackChunkName: "clients" */ "../views/ClientsView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
