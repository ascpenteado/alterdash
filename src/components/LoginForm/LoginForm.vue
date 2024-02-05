<template>
  <v-form @submit.prevent="login">
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

<script lang="ts" setup>
import { ref } from "vue";
import { showSnackbar } from "../../store/snackBar/snackBar.state";

const email = ref("");
const password = ref("");

const login = () => {
  if (!email.value) {
    return showSnackbar("O email é obrigatório", "red");
  }

  if (!password.value) {
    return showSnackbar("A senha é obrigatória", "red");
  }
};
</script>
