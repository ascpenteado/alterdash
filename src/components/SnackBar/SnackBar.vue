<template>
  <v-snackbar v-model="state.visible" :color="state.color" top right app>
    <div class="d-flex justify-space-between align-center p-0">
      {{ state.message }}
      <v-btn text @click="hideSnackbar">Fechar</v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { state, hideSnackbar } from "../../store/snackBar/snackBar.state";
</script>
