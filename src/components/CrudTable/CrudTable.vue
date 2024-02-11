<!-- eslint-disable vue/valid-v-slot -->

<template>
  <v-data-table
    :items="items"
    :items-per-page="10"
    :hide-default-footer="true"
    :headers="tableHeaders"
    sort-by="id"
    show-select
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-5 pa-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="pa-2" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

const CrudTable = Vue.extend({
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
      this.$emit("delete-item", item);
    },
  },
});

export default CrudTable;
</script>
