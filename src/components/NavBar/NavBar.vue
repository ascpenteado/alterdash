<template>
  <v-app-bar app color="primary">
    <div
      class="d-flex align-center justify-space-between flex-grow-1 flex-shrink-0"
    >
      <router-link to="/">
        <div class="d-flex white--text align-center pa-2 logo-wrapper">
          <app-logo color="white"></app-logo>
        </div>
      </router-link>

      <nav class="d-none d-sm-flex align-center nav">
        <v-btn text to="/" class="nav-item" color="secondary">Painel</v-btn>
        <v-btn text to="/products" class="nav-item" color="secondary"
          >Produtos</v-btn
        >
        <v-btn text to="/clients" class="nav-item" color="secondary"
          >Clientes</v-btn
        >
        <nav-drop />
      </nav>
    </div>

    <v-app-bar-nav-icon
      class="d-flex d-sm-none"
      @click="mobileNavActions.openMobileNav()"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import NavDrop from "../NavDropdown/NavDropdown.vue";
import { mobileNavActions } from "../../store/mobileNav/mobileNav.state";
import AppLogo from "../AppLogo/AppLogo.vue";
</script>

<style scoped lang="scss">
.nav {
  gap: 0.5rem;
  .nav-item {
    padding: 0.5rem;
    font-size: 0.75rem;
    @media screen and (min-width: 1200px) {
      font-size: 1rem;
      padding: 1rem;
    }
  }
  .v-btn--active {
  }
}

.logo-wrapper {
  max-width: 200px;
}
</style>
