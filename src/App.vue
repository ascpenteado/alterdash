<template>
  <v-app>
    <nav-bar />
    <nav-drawer />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavBar from "./components/NavBar/NavBar.vue";
import NavDrawer from "./components/NavDrawer/NavDrawer.vue";
</script>
