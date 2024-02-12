<template>
  <v-container>
    <view-toolbar title="Clientes" addUrl="/clients/new"></view-toolbar>

    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      type="table"
      transition="fade-transition"
    ></v-skeleton-loader>
    <template v-else>
      <crud-table
        v-if="clients.length > 0"
        :items="clients"
        :tableHeaders="tableHeaders"
        v-on:edit-item="editClient"
        v-on:delete-item="deleteClient"
      ></crud-table>
      <empty-content v-else></empty-content>
    </template>
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
import { deleteClient } from "@/services/clients/deleteClient";
import { showSnackbar } from "@/store/snackBar/snackBar.state";

type DataReturnType = {
  clients: ApiClientData[];
  token: string | null;
  tableHeaders: { text: string; value: string; sortable?: boolean }[];
  loading: boolean;
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
      loading: false,
    };
  },
  methods: {
    editClient(client: ApiClientData) {
      router.push(`/clients/${client.id}`);
    },
    async deleteClient(client: ApiClientData) {
      if (!client.id) return;
      try {
        await deleteClient(client.id);
        this.$router.go(0);
        showSnackbar("Cliente excluído com sucesso", "success");
      } catch (error) {
        showSnackbar("Erro ao excluir cliente", "error");
      }
    },
  },
  async created() {
    this.loading = true;
    const res = await getClients();
    this.clients = res ?? [];
    this.tableHeaders = clientsTableHeaders;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
});

export default ListClients;
</script>
