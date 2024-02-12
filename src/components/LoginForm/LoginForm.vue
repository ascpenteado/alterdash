<template>
  <v-form ref="form" v-on:submit.prevent="login" id="login">
    <v-text-field
      v-model.trim="email"
      label="Email"
      type="email"
      color="accent"
      :rules="[rules.required, rules.email]"
      class="mb-4"
    ></v-text-field>
    <v-text-field
      v-model.trim="password"
      label="Senha"
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      color="accent"
      :rules="[rules.required]"
      class="mb-4"
    ></v-text-field>
    <v-btn type="submit" color="primary">Login</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { apiLogin } from "@/services/login";
import store, { SnackbarMutation } from "@/store";
import { formValidationRules } from "@/utils/formValidationRules";

const LoginForm = Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      rules: formValidationRules,
      valid: false,
      show: false,
    };
  },
  methods: {
    async login() {
      const formRef = this.$refs.form as HTMLFormElement;

      this.valid = formRef.validate();

      if (!this.valid) {
        store.commit(SnackbarMutation.ShowSnackbar, {
          message: "Preencha os campos corretamente",
          color: "error",
        });
        return;
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
