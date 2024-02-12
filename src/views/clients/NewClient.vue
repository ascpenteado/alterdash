<template>
  <v-container>
    <view-toolbar title="Adicionar cliente" showGoBack></view-toolbar>
    <v-card class="pa-4">
      <client-form @submit="create"> </client-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ClientForm, ViewToolbar } from "@/components";
import { createClient } from "@/services/clients/createClient";
import { ApiClientData } from "@/types/clients.types";
const NewClient = Vue.extend({
  components: {
    ClientForm,
    ViewToolbar,
  },
  methods: {
    async create(client: Omit<ApiClientData, "id" | "dataCadastro">) {
      const newDate = new Date().toISOString();
      const newClient = { ...client, dataCadastro: newDate };

      createClient(newClient);
    },
  },
});
export default NewClient;
</script>
