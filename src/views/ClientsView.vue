<template>
  <v-container>
    <v-toolbar dense class="elevation-0 mb-2 rounded">
      <v-toolbar-title>Clientes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="accent"> <v-icon>mdi-plus</v-icon> Adicionar </v-btn>
    </v-toolbar>

    <crud-table :items="clients" :tableHeaders="tableHeaders"></crud-table>
  </v-container>
</template>

<script lang="ts">
import CrudTable from "@/components/CrudTable/CrudTable.vue";
import Vue from "vue";
import { VContainer } from "vuetify/lib";
import { apiClient } from "../services/api.service";
import {
  ApiClient,
  ClientTableHeaders,
  ClientTableHeadersType,
} from "../types/clients.types";

async function getClients() {
  try {
    return await apiClient.get<ApiClient[]>("/clientes", null);
  } catch (error) {
    console.error(">> error", error);
  }
}

function buildClients(clients: ApiClient[]): ApiClient[] {
  return clients.map((client) => ({
    ...client,
    dataCadastro: new Date(client.dataCadastro).toLocaleDateString("pt-BR"),
  }));
}

function buildTableHeaders(clients: ApiClient[]) {
  const keys: { text: string; value: string; sortable?: boolean }[] =
    Object.keys(clients[0]).map((key) => ({
      text: ClientTableHeaders[key as ClientTableHeadersType],
      value: key,
    }));

  keys.push({ text: "Ações", value: "actions", sortable: false });

  return keys;
}

const ClientsView = Vue.extend({
  components: {
    VContainer,
    CrudTable,
  },
  data: () => {
    return {
      clients: [] as ApiClient[],
      token: null as string | null,
      tableHeaders: [{ text: "", value: "" }],
    };
  },
  methods: {
    editItem(item: ApiClient) {
      console.log(">> editItem", item);
    },
    deleteItem(item: ApiClient) {
      console.log(">> deleteItem", item);
    },
  },
  async created() {
    const res = await getClients();
    if (!res?.length) {
      return;
    }

    this.clients = buildClients(res);
    this.tableHeaders = buildTableHeaders(this.clients);
  },
});

export default ClientsView;
</script>
