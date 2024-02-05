<template>
  <div>
    <v-app app>
      <v-main class="d-flex justify-content-center align-center">
        <v-container class="d-flex flex-grow-1 justify-center align-center">
          <v-card width="100%" max-width="550">
            <div class="primary pa-4 d-flex justify-center">
              <div class="d-flex white--text text-xs-h1 align-center">
                <v-icon color="secondary" class="text-h4">mdi-poll</v-icon>
                <span class="white--text ml-5 text-h4">AlterDash</span>
              </div>
            </div>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <LoginForm />
            </v-card-text>
          </v-card>
        </v-container>
        <snack-bar />
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import SnackBar from "@/components/SnackBar/SnackBar.vue";
</script>
