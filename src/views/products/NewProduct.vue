<template>
  <v-container>
    <view-toolbar title="Adicionar produto" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <product-form @submit="createProduct"> </product-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ProductForm from "@/components/ProductForm/ProductForm.vue";
import ViewToolbar from "@/components/ViewToolbar/ViewToolbar.vue";
import { createProduct } from "@/services/product/createProduct";
import { ApiProduct } from "@/types/product.types";
const NewProduct = Vue.extend({
  components: {
    ProductForm,
    ViewToolbar,
  },
  methods: {
    async createProduct(product: Omit<ApiProduct, "id" | "dataCadastro">) {
      createProduct(product);
    },
  },
});
export default NewProduct;
</script>
