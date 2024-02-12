<template>
  <v-select
    :items="['light', 'dark', 'system']"
    color="accent"
    v-model="theme"
    label="Tema"
  ></v-select>
</template>

<script lang="ts">
import { isDarkModePreferredByUser } from "@/utils/isDarkModePreferredByUser";
import Vue from "vue";

const ThemeSwitcher = Vue.extend({
  data() {
    return {
      theme: "system",
    };
  },
  watch: {
    theme(theme) {
      switch (theme) {
        case "light":
          this.$vuetify.theme.dark = false;
          break;
        case "dark":
          this.$vuetify.theme.dark = true;
          break;
        case "system":
          this.$vuetify.theme.dark = isDarkModePreferredByUser();
          break;
      }
    },
  },
});

export default ThemeSwitcher;
</script>
