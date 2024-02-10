<template>
  <div class="wrapper">
    <img :src="logoPath" class="logo" alt="Alterdash Logo" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Logo from "../../assets/images/logo-h.png";
import LogoBranca from "../../assets/images/logo-h-branca.png";

const AppLogo = Vue.extend({
  props: {
    color: {
      type: String,
      required: true,
      validator: (value: string) => ["colored", "white"].includes(value),
    },
  },
  data() {
    return {
      logoPath: this.color === "colored" ? Logo : LogoBranca,
    };
  },
});

export default AppLogo;
</script>

<style lang="scss">
.wrapper {
  max-width: 100%;
  .logo {
    max-width: 100%;
  }
}
</style>
