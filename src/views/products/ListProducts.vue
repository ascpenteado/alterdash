<template>
  <v-container>
    <v-toolbar dense class="elevation-0 mb-2 rounded">
      <v-toolbar-title>Produtos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="accent" to="/products/new">
        <v-icon>mdi-plus</v-icon> Adicionar
      </v-btn>
    </v-toolbar>

    <crud-table :items="products" :tableHeaders="tableHeaders"></crud-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { VContainer } from "vuetify/lib";
import CrudTable from "@/components/CrudTable/CrudTable.vue";
import { apiClient } from "@/services/api.service";
import router from "@/router";
import {
  ApiProduct,
  Product,
  ProductTableHeaders,
  ProductTableHeadersType,
} from "@/types/product.types";

async function getProcuts(token: string) {
  if (!token) {
    return;
  }

  try {
    return await apiClient.get<ApiProduct[]>("/produtos", null, {
      Authorization: token,
    });
  } catch (error) {
    console.error(">> error", error);
  }
}

function buildProducts(products: ApiProduct[]): Product[] {
  return products.map((product) => ({
    ...product,
    valor: product.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    quantidadeEstoque: product.quantidadeEstoque.toString(),
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
      console.log(">> editItem", item);
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

    const res = await getProcuts(this.token);
    if (!res?.length) {
      return;
    }

    this.products = buildProducts(res);
    this.tableHeaders = buildTableHeaders(this.products);
  },
});

export default ListProducts;
</script>
