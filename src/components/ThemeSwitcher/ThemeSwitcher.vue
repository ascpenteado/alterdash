<template>
  <v-select
    v-model="select"
    :items="items"
    item-text="text"
    item-value="value"
    label="Selecione o tema"
    persistent-hint
    return-object
    single-line
    color="accent"
    item-color="accent"
  ></v-select>
</template>

<script lang="ts">
import { isDarkModePreferredByUser } from "@/utils/isDarkModePreferredByUser";
import Vue from "vue";

const themes = [
  {
    value: "light",
    text: "Claro",
  },
  {
    value: "dark",
    text: "Escuro",
  },
  {
    value: "system",
    text: "Preferência do Sistema",
  },
];

const currentThemePreference = localStorage.getItem("theme");

const ThemeSwitcher = Vue.extend({
  data() {
    return {
      items: themes,
      select: currentThemePreference
        ? { value: currentThemePreference }
        : themes[2],
    };
  },
  watch: {
    select(theme) {
      switch (theme.value) {
        case "light":
          this.$vuetify.theme.dark = false;
          localStorage.setItem("theme", "light");
          break;
        case "dark":
          this.$vuetify.theme.dark = true;
          localStorage.setItem("theme", "dark");
          break;
        case "system":
          localStorage.removeItem("theme");
          this.$vuetify.theme.dark = isDarkModePreferredByUser();
          break;
      }
    },
  },
});

export default ThemeSwitcher;
</script>
