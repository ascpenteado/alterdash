<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <h1>Perfil</h1>
        <v-card class="profile">
          <v-img :src="user.foto" alt="User photo" aspect-ratio="1"></v-img>
          <v-card-title>{{ user.nome }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <div class="pa-3">
            <theme-switcher></theme-switcher>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { ThemeSwitcher } from "@/components/";
import store, { UserMutation } from "@/store";
import { getUserById } from "@/services/user";

const ProfileView = Vue.extend({
  components: {
    ThemeSwitcher,
  },
  computed: {
    user() {
      return store.state.user;
    },
  },

  async created() {
    const userId = localStorage.getItem("id");
    if (userId && !store.state.user.nome) {
      const user = await getUserById(Number(userId));
      store.commit(UserMutation.SetName, user?.nome);
      store.commit(UserMutation.SetEmail, user?.email);
      store.commit(UserMutation.SetPhoto, user?.foto);
    }
  },
});

export default ProfileView;
</script>

<style scoped>
.profile {
  /* Add your styles here */
  margin-top: 2rem;
}
</style>
