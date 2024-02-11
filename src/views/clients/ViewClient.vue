<template>
  <v-container>
    <view-toolbar title="Editar produto" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <client-form :propsClient="product" @submit="submit"></client-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ViewToolbar, ClientForm } from "@/components";
import { editProduct } from "@/services/product/editProduct";
import { Product } from "@/types/product.types";
import { getProductById } from "@/services/product/getProductById";

const ViewProduct = Vue.extend({
  components: {
    ClientForm,
    ViewToolbar,
  },
  async created() {
    const productId = this.$route.params.id;
    const apiProduct = await getProductById(productId);

    if (!apiProduct) {
      return;
    }

    if (apiProduct.id) {
      this.product = {
        nome: apiProduct.nome,
        observacao: apiProduct.observacao,
        valor: apiProduct.valor,
        quantidadeEstoque: apiProduct.quantidadeEstoque,
        dataCadastro: new Date(apiProduct.dataCadastro).toLocaleDateString(
          "pt-BR"
        ),
        id: apiProduct.id,
      };
    }
  },
  data() {
    return {
      product: {} as Product,
    };
  },
  methods: {
    async updateProduct(product: Product) {
      editProduct(product);
    },
  },
});

export default ViewProduct;
</script>
