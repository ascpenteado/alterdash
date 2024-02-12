<template>
  <v-container>
    <view-toolbar title="Editar produto" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <client-form :propsClient="client" @submit="updateClient"></client-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ViewToolbar, ClientForm } from "@/components";
import { ApiClientData } from "@/types/clients.types";
import { getClientById } from "@/services/clients/getClientById";
import { editClient } from "@/services/clients/editClient";

const ViewProduct = Vue.extend({
  components: {
    ClientForm,
    ViewToolbar,
  },
  async created() {
    const clientId = this.$route.params.id;
    const apiClient = await getClientById(clientId);

    if (!apiClient) {
      return;
    }

    if (apiClient.id) {
      this.client = {
        ...apiClient,
        dataCadastro: new Date(apiClient.dataCadastro).toLocaleDateString(
          "pt-BR"
        ),
      };
    }
  },
  data() {
    return {
      client: {} as ApiClientData,
    };
  },
  methods: {
    async updateClient(client: ApiClientData) {
      console.log("client", client);
      editClient(client);
    },
  },
});

export default ViewProduct;
</script>
