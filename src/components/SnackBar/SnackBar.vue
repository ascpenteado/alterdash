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

      <v-btn text @click="hideSnackbar">Fechar</v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { state, hideSnackbar } from "../../store/snackBar/snackBar.state";

const SnackBar = Vue.extend({
  data() {
    return {
      state,
    };
  },
  methods: {
    hideSnackbar() {
      hideSnackbar();
    },
  },
});

export default SnackBar;
</script>
