<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="secondary" icon class="ml-10 mr-1">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item link to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Perfil</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { logout } from "../../services/logout";

const NavDrop = Vue.extend({
  name: "NavDrop",
  methods: {
    logout() {
      logout();
    },
  },
});

export default NavDrop;
</script>
