import { reactive } from "vue";

type SnackbarState = {
  visible: boolean;
  message: string | string[];
  color: string;
};

export const state = reactive<SnackbarState>({
  visible: false,
  message: "",
  color: "",
});

export const showSnackbar = (message: string | string[], color: string) => {
  state.visible = true;
  state.message = message;
  state.color = color;
};

export const hideSnackbar = () => {
  state.visible = false;
  state.message = "";
  state.color = "";
};
