<template>
  <v-container>
    <v-toolbar dense class="elevation-0 mb-2 rounded">
      <v-toolbar-title>Adicionar produto</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="accent" to="/products/new">
        <v-icon>mdi-plus</v-icon> Adicionar
      </v-btn>
    </v-toolbar>
    <v-card class="pa-4">
      <product-form> </product-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ProductForm from "@/components/ProductForm/ProductForm.vue";
export default Vue.extend({
  components: {
    ProductForm,
  },
});
</script>
