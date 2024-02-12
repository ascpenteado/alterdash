<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-slide-x-transition>
          <v-card elevation="3" v-show="!loading">
            <v-card-title>Total de Produtos: {{ totalProdutos }}</v-card-title>
          </v-card>
        </v-slide-x-transition>
      </v-col>
      <v-col cols="12" sm="6">
        <v-slide-x-reverse-transition>
          <v-card elevation="3" v-show="!loading">
            <v-card-title>Total de clientes: {{ totalClientes }}</v-card-title>
          </v-card>
        </v-slide-x-reverse-transition>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-slide-x-transition>
          <v-card elevation="3" v-show="!loading">
            <v-card-title>10 Produtos com maior estoque</v-card-title>
            <bar
              id="top-stock"
              :options="topStockChartOptions"
              :data="topStockProductsChartData"
            ></bar>
          </v-card>
        </v-slide-x-transition>
      </v-col>
      <v-col cols="12" md="6">
        <v-slide-x-reverse-transition>
          <v-card elevation="3" v-show="!loading">
            <v-card-title>Produtos com estoque zerado ou negativo</v-card-title>
            <bar
              id="zero-negative"
              :options="zeroNegativeChartOptions"
              :data="zeroOrNegativeProductsChartData"
            ></bar>
          </v-card>
        </v-slide-x-reverse-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { getClients } from "@/services/clients/getClients";
import { getProducts } from "@/services/product/getProducts";
import { ApiClientData } from "@/types/clients.types";
import { Product } from "@/types/product.types";
import { VContainer } from "vuetify/lib";
import { Bar } from "vue-chartjs";

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
Chart.defaults.maintainAspectRatio = true;
Chart.defaults.layout.padding = 16;
Chart.defaults.font.size = 14;

type DataReturnType = {
  produtos: Product[];
  clientes: ApiClientData[];
  loading: boolean;
  zeroNegativeChartOptions: object;
  topStockChartOptions: object;
};

export default Vue.extend({
  name: "HomeView",

  components: {
    VContainer,
    Bar,
  },

  data(): DataReturnType {
    return {
      produtos: [],
      clientes: [],
      loading: false,
      topStockChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      zeroNegativeChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right",
          },
        },
      },
    };
  },

  computed: {
    totalProdutos(): number {
      return this.produtos.length;
    },
    totalClientes(): number {
      return this.clientes.length;
    },
    topStockProducts(): Product[] {
      return this.produtos.slice(0, 10).sort((a, b) => {
        if (b.quantidadeEstoque && a.quantidadeEstoque) {
          return Number(b.quantidadeEstoque) - Number(a.quantidadeEstoque);
        }
        return 0;
      });
    },
    topStockProductsChartData(): any {
      return {
        labels: this.topStockProducts.map((product) => product.nome),
        datasets: [
          {
            data: this.topStockProducts.map(
              (product) => product.quantidadeEstoque
            ),
            minBarLength: 1,
            backgroundColor: [
              ...Object.values(this.$vuetify.theme.currentTheme),
            ],
          },
        ],
      };
    },
    zeroOrNegativeStockProducts(): Product[] {
      return this.produtos.filter((product) => {
        return Number(product.quantidadeEstoque) <= 0;
      });
    },
    zeroOrNegativeProductsChartData(): any {
      return {
        labels: this.zeroOrNegativeStockProducts.map((product) => product.nome),
        datasets: [
          {
            indexAxis: "y",
            minBarLength: 2,
            data: this.zeroOrNegativeStockProducts.map(
              (product) => product.quantidadeEstoque
            ),
            backgroundColor: [
              ...Object.values(this.$vuetify.theme.currentTheme),
            ],
          },
        ],
      };
    },
  },

  async created() {
    this.loading = true;

    const products = await getProducts();
    const clients = await getClients();

    this.produtos = products ?? [];
    this.clientes = clients ?? [];

    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
});
</script>
