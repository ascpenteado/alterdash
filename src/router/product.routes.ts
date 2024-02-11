export const productRoutes = [
  {
    path: "/products",
    name: "products",
    component: () =>
      import(
        /* webpackChunkName: "products" */ "../views/products/ListProducts.vue"
      ),
  },
  {
    path: "/products/new",
    name: "new-product",
    component: () =>
      import(
        /* webpackChunkName: "new-product" */ "../views/products/NewProduct.vue"
      ),
  },
  {
    path: "products/:id",
    name: "view-product",
    component: () =>
      import(
        /* webpackChunkName: "view-product" */ "../views/products/ViewProduct.vue"
      ),
  },
];
