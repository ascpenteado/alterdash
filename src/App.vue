<template>
  <v-app dark>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Alterdash Logo"
          class="shrink mr-5"
          contain
          src="./assets/images/logo.png"
          transition="scale-transition"
          width="40"
        />

        <h1>AlterDash</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="#" target="_blank" text>
        <span>Clientes</span>
      </v-btn>
      <v-btn href="#" target="_blank" text>
        <span>Produtos</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
