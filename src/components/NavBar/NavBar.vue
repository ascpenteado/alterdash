<template>
  <v-app-bar app color="primary">
    <div class="d-flex align-center justify-space-between flex-grow-1">
      <router-link to="/">
        <div class="d-flex white--text text-xs-h1 align-center">
          <v-icon color="secondary" class="text-h4">mdi-poll</v-icon>
          <span class="white--text ml-5 text-h4">AlterDash</span>
        </div>
      </router-link>

      <nav class="d-none d-sm-flex align-center">
        <v-btn text to="/products" color="secondary">Produtos</v-btn>
        <v-btn text to="/clients" color="secondary">Clientes</v-btn>
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
import { mobileNavActions } from "../../store/mobileNav.state";
</script>
