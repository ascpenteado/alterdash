<template>
  <v-container>
    <view-toolbar title="Clientes" addUrl="/clients/new"></view-toolbar>

    <crud-table
      v-if="clients.length > 0"
      :items="clients"
      :tableHeaders="tableHeaders"
      v-on:edit-item="editClient"
      v-on:delete-item="deleteClient"
    ></crud-table>
    <empty-content v-else></empty-content>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { VContainer } from "vuetify/lib";
import router from "@/router";
import { CrudTable, EmptyContent, ViewToolbar } from "@/components";
import { getClients } from "@/services/clients/getClients";
import { ApiClientData } from "@/types/clients.types";
import { clientsTableHeaders } from "./clients.helper";

type DataReturnType = {
  clients: ApiClientData[];
  token: string | null;
  tableHeaders: { text: string; value: string; sortable?: boolean }[];
};

const ListClients = Vue.extend({
  components: {
    VContainer,
    CrudTable,
    ViewToolbar,
    EmptyContent,
  },
  data: (): DataReturnType => {
    return {
      clients: [] as ApiClientData[],
      token: null as string | null,
      tableHeaders: [{ text: "", value: "", sortable: false }],
    };
  },
  methods: {
    editClient(client: ApiClientData) {
      router.push(`/clients/${client.id}`);
    },
    async deleteClient(client: ApiClientData) {
      if (!client.id) return;
      // await deleteProduct(item.id);
      // this.$router.go(0);
      // showSnackbar("Produto excluído com sucesso", "success");
    },
  },
  async created() {
    const res = await getClients();
    if (!res?.length) return;
    this.clients = res;
    this.tableHeaders = clientsTableHeaders;
  },
});

export default ListClients;
</script>
