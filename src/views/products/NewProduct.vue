<template>
  <v-container>
    <view-toolbar title="Adicionar produto" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <product-form> </product-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ProductForm from "@/components/ProductForm/ProductForm.vue";
import ViewToolbar from "@/components/ViewToolbar/ViewToolbar.vue";
const NewProduct = Vue.extend({
  components: {
    ProductForm,
    ViewToolbar,
  },
});
export default NewProduct;
</script>
