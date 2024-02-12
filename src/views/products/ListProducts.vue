<template>
  <v-container>
    <view-toolbar title="Produtos" addUrl="/products/new"></view-toolbar>

    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      type="table"
      transition="fade-transition"
    ></v-skeleton-loader>
    <template v-else>
      <crud-table
        v-if="products.length > 0"
        :items="products"
        :tableHeaders="tableHeaders"
        v-on:edit-item="editItem"
        v-on:delete-item="deleteItem"
      ></crud-table>
      <empty-content v-else></empty-content>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { VContainer } from "vuetify/lib";
import { EmptyContent, CrudTable, ViewToolbar } from "@/components";
import { getProducts } from "@/services/product/getProducts";
import router from "@/router";
import { Product } from "@/types/product.types";
import { deleteProduct } from "@/services/product/deleteProduct";
import { buildProducts, productTableHeaders } from "./product.helper";
import store, { SnackbarMutation } from "@/store";

type DataReturnType = {
  products: Product[];
  token: string | null;
  tableHeaders: { text: string; value: string; sortable?: boolean }[];
  loading: boolean;
};

const ListProducts = Vue.extend({
  components: {
    VContainer,
    CrudTable,
    ViewToolbar,
    EmptyContent,
  },
  data: (): DataReturnType => {
    return {
      products: [] as Product[],
      token: null as string | null,
      tableHeaders: [{ text: "", value: "", sortable: false }],
      loading: false,
    };
  },
  methods: {
    editItem(item: Product) {
      router.push(`/products/${item.id}`);
    },
    async deleteItem(item: Product) {
      if (!item.id) return;
      await deleteProduct(item.id);
      this.$router.go(0);
      store.commit(SnackbarMutation.ShowSnackbar, {
        message: "Produto excluído com sucesso",
        color: "success",
      });
    },
  },
  async created() {
    this.loading = true;
    const res = await getProducts();
    if (!res?.length) return;

    this.products = buildProducts(res);
    this.tableHeaders = productTableHeaders;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
});

export default ListProducts;
</script>
