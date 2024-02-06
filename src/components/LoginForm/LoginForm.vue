<template>
  <v-form v-on:submit.prevent="login" id="login">
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      color="accent"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Senha"
      type="password"
      color="accent"
    ></v-text-field>
    <v-btn type="submit" color="primary">Login</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { showSnackbar } from "@/store/snackBar/snackBar.state";
import { validateLoginFormFields } from "./LoginForm.helpers";
import { apiLogin } from "@/services/login";

const LoginForm = Vue.extend({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const errors = validateLoginFormFields(this.email, this.password);
      if (errors?.length) {
        return showSnackbar(errors, "error");
      }

      try {
        apiLogin(this.email, this.password);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default LoginForm;
</script>
