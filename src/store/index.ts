import Vue from "vue";
import Vuex from "vuex";
import snackbar from "./snackBar/snackBar.state";
import user from "./user/user.state";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar,
    user,
  },
});

export enum SnackbarMutation {
  ShowSnackbar = "showSnackbar",
  HideSnackbar = "hideSnackbar",
}

export enum UserMutation {
  SetEmail = "setEmail",
  SetPhoto = "setPhoto",
  SetName = "setName",
  SetThemePreference = "setThemePreference",
}
