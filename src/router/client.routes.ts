export const clientRoutes = [
  {
    path: "/clients",
    name: "clients",
    component: () =>
      import(
        /* webpackChunkName: "clients" */ "../views/clients/ListClients.vue"
      ),
  },
  {
    path: "/clients/new",
    name: "new-client",
    component: () =>
      import(
        /* webpackChunkName: "new-client" */ "../views/clients/NewClient.vue"
      ),
  },
  {
    path: "clients/:id",
    name: "view-client",
    component: () =>
      import(
        /* webpackChunkName: "view-client" */ "../views/clients/ViewClient.vue"
      ),
  },
];
