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
import { apiClient } from "../../services/api.service";
import { ObjetoUsuario } from "../../types/api.types";
import router from "../../router";

const email = ref("");
const password = ref("");

const login = async () => {
  if (!email.value) {
    return showSnackbar("O email é obrigatório", "red");
  }

  if (!password.value) {
    return showSnackbar("A senha é obrigatória", "red");
  }

  const res = await apiClient.post<ObjetoUsuario>("/login", {
    email: email.value,
    senha: password.value,
  });

  if (!res) return;

  if (res.token) {
    localStorage.setItem("token", res.token);
    router.push("/");
  }
};
</script>
