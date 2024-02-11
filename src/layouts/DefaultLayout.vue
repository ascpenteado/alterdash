<template>
  <v-app>
    <nav-bar />
    <nav-drawer />

    <v-main>
      <router-view />
    </v-main>
    <snack-bar />
  </v-app>
</template>

<script lang="ts">
import NavBar from "../components/NavBar/NavBar.vue";
import NavDrawer from "../components/NavDrawer/NavDrawer.vue";
import SnackBar from "../components/SnackBar/SnackBar.vue";

export default {
  components: {
    NavBar,
    NavDrawer,
    SnackBar,
  },
};
</script>
