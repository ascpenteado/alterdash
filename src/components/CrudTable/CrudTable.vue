<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-data-table
      :items="items"
      :items-per-page="10"
      :headers="tableHeaders"
      sort-by="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-5 pa-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="pa-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Você tem certeza que deseja excluir este dado?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmItemDelete"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type DataReturnType = {
  deleteDialog: boolean;
  itemToBeDeleted: unknown;
};

const CrudTable = Vue.extend({
  data: (): DataReturnType => {
    return {
      deleteDialog: false,
      itemToBeDeleted: null,
    };
  },
  props: {
    items: {
      type: Array as () => unknown[],
      required: true,
    },
    tableHeaders: {
      type: Array as () => {
        text: string;
        value: string;
        sortable?: boolean;
      }[],
      required: true,
    },
  },
  methods: {
    editItem(item: unknown) {
      this.$emit("edit-item", item);
    },
    deleteItem(item: unknown) {
      this.itemToBeDeleted = item;
      this.deleteDialog = true;
    },
    closeDelete() {
      this.deleteDialog = false;
    },
    confirmItemDelete() {
      this.$emit("delete-item", this.itemToBeDeleted);
      this.deleteDialog = false;
    },
  },
});

export default CrudTable;
</script>
