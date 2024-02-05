<template>
  <v-navigation-drawer v-model="mobileNavState" temporary right app>
    <nav class="d-flex d-sm-none flex-column">
      <v-list>
        <v-list-item link to="/products">
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/clients">
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </nav>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { mobileNavState } from "../../store/mobileNav/mobileNav.state";
</script>
