<template>
  <v-select
    :items="['dark', 'light', 'system']"
    v-model="theme"
    label="Theme"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";

const ThemeSwitcher = Vue.extend({
  data() {
    return {
      theme: "dark",
    };
  },
  watch: {
    theme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
    },
  },
});

export default ThemeSwitcher;
</script>
