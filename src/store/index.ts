import Vue from "vue";
import Vuex from "vuex";
import snackbar from "./snackBar/snackBar.state";

export enum SnackbarMutation {
  ShowSnackbar = "showSnackbar",
  HideSnackbar = "hideSnackbar",
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar,
  },
});
