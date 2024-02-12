import { Module } from "vuex";
import { SnackbarColor } from "@/types/snackbar.types";

export type SnackbarState = {
  visible: boolean;
  message: string | string[];
  color: SnackbarColor | null;
  timeout: number;
};

interface SnackbarPayload {
  message: string | string[];
  color: SnackbarColor;
  timeout?: number;
}

const initialState: SnackbarState = {
  visible: false,
  message: "",
  color: null,
  timeout: 3000,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const snackbar: Module<SnackbarState, any> = {
  state: initialState,
  mutations: {
    showSnackbar(state, payload: SnackbarPayload) {
      state.visible = true;
      state.message = payload.message;
      state.color = payload.color;
      state.timeout = payload.timeout || 3000;
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
