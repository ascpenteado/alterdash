// src/store/snackbar.ts

import { Module } from "vuex";
import { SnackbarColor } from "@/types/snackbar.types";

export type SnackbarState = {
  visible: boolean;
  message: string | string[];
  color: SnackbarColor | null;
  timeout: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const snackbar: Module<SnackbarState, any> = {
  state: {
    visible: false,
    message: "",
    color: null,
    timeout: 3000,
  },
  mutations: {
    showSnackbar(state, { message, color, timeout = 3000 }) {
      state.visible = true;
      state.message = message;
      state.color = color;
      state.timeout = timeout;
    },
    hideSnackbar(state) {
      state.visible = false;
      state.message = "";
      state.color = null;
      state.timeout = 3000;
    },
  },
};

export default snackbar;
