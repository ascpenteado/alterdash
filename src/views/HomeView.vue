<template>
  <v-container>
    <p>Hello World</p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { VContainer } from "vuetify/lib";

export default Vue.extend({
  name: "HomeView",

  components: {
    VContainer,
  },
});
</script>
