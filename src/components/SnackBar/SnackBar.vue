<template>
  <v-snackbar
    v-model="state.visible"
    :color="state.color"
    :timeout="state.timeout"
    top
    right
    app
  >
    <div class="d-flex justify-space-between align-center p-0">
      <template v-if="Array.isArray(state.message)">
        <ul>
          <li v-for="(message, index) in state.message" :key="index">
            {{ message }}
          </li>
        </ul>
      </template>
      <span v-else>{{ state.message }}</span>

      <v-btn class="ml-3" text @click="hideSnackbar">Fechar</v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import store, { SnackbarMutation } from "@/store";

const SnackBar = Vue.extend({
  data() {
    return {
      state: store.state.snackbar,
    };
  },
  methods: {
    hideSnackbar() {
      store.commit(SnackbarMutation.HideSnackbar);
    },
  },
});

export default SnackBar;
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
