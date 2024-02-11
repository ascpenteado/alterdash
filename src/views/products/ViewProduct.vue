<template>
  <v-container>
    <view-toolbar title="Editar produto" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <product-form :propsProduct="product" @submit="updateProduct">
      </product-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ProductForm from "@/components/ProductForm/ProductForm.vue";
import ViewToolbar from "@/components/ViewToolbar/ViewToolbar.vue";
import { editProduct } from "@/services/product/edit-product";
import { Product } from "@/types/product.types";
import { getProductById } from "@/services/product/get-product-by-id";

const ViewProduct = Vue.extend({
  components: {
    ProductForm,
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
