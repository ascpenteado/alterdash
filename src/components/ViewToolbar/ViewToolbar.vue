<template>
  <v-toolbar dense height="60px" class="elevation-0 px-1 mb-2 rounded">
    <v-btn v-if="showGoBack" icon @click="$router.go(-1)">
      <v-icon color="acce">mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn v-if="addUrl" text color="accent" :to="addUrl">
      <v-icon>mdi-plus</v-icon> Adicionar
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
const ViewToolbar = Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    addUrl: {
      type: String,
    },
    showGoBack: {
      type: Boolean,
      default: false,
    },
  },
});

export default ViewToolbar;
</script>
