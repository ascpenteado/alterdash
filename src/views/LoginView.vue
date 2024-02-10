<template>
  <div>
    <v-app app>
      <v-main class="d-flex justify-content-center align-center">
        <v-container class="d-flex flex-grow-1 justify-center align-center">
          <v-card width="100%" max-width="550">
            <div class="primary d-flex justify-center">
              <div class="d-flex align-center logo-wrapper pa-4">
                <app-logo color="white"></app-logo>
              </div>
            </div>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <login-form />
            </v-card-text>
          </v-card>
        </v-container>
        <snack-bar />
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import SnackBar from "@/components/SnackBar/SnackBar.vue";
import AppLogo from "../components/AppLogo/AppLogo.vue";

const LoginView = Vue.extend({
  components: {
    LoginForm,
    SnackBar,
    AppLogo,
  },
});

export default LoginView;
</script>

<style lang="scss">
.logo-wrapper {
  max-width: 80%;
}
</style>
