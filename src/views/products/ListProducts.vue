<template>
  <v-container>
    <view-toolbar title="Produtos" addUrl="/products/new"></view-toolbar>

    <crud-table
      :items="products"
      :tableHeaders="tableHeaders"
      v-on:edit-item="editItem"
      v-on:delete-item="deleteItem"
    ></crud-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { VContainer } from "vuetify/lib";
import CrudTable from "@/components/CrudTable/CrudTable.vue";
import ViewToolbar from "@/components/ViewToolbar/ViewToolbar.vue";
import { getProducts } from "@/services/product/get-products";
import router from "@/router";
import {
  ApiProduct,
  Product,
  ProductTableHeaders,
  ProductTableHeadersType,
} from "@/types/product.types";

function buildProducts(products: ApiProduct[]): Product[] {
  return products.map((product) => ({
    ...product,
    valor: product.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    quantidadeEstoque: product.quantidadeEstoque,
    dataCadastro: new Date(product.dataCadastro).toLocaleDateString("pt-BR"),
  }));
}

function buildTableHeaders(products: Product[]) {
  const keys: { text: string; value: string; sortable?: boolean }[] =
    Object.keys(products[0]).map((key) => ({
      text: ProductTableHeaders[key as ProductTableHeadersType],
      value: key,
    }));

  keys.push({ text: "Ações", value: "actions", sortable: false });

  return keys;
}

const ListProducts = Vue.extend({
  components: {
    VContainer,
    CrudTable,
    ViewToolbar,
  },
  data: () => {
    return {
      products: [] as Product[],
      token: null as string | null,
      tableHeaders: [{ text: "", value: "" }],
    };
  },
  methods: {
    editItem(item: Product) {
      router.push(`/products/${item.id}`);
    },
    deleteItem(item: Product) {
      console.log(">> deleteItem", item);
    },
  },
  async created() {
    this.token = localStorage.getItem("token");
    if (!this.token) {
      return router.push("/login");
    }

    const res = await getProducts(this.token);
    if (!res?.length) return;

    this.products = buildProducts(res);
    this.tableHeaders = buildTableHeaders(this.products);
  },
});

export default ListProducts;
</script>
