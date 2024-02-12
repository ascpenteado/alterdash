<template>
  <v-app>
    <nav-bar />
    <nav-drawer />

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
