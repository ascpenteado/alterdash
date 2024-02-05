import { ref } from "vue";

type SnackbarState = {
  visible: boolean;
  message: string;
  color: string;
};

export const state = ref<SnackbarState>({
  visible: false,
  message: "",
  color: "",
});

export const showSnackbar = (message: string, color: string) => {
  state.value.visible = true;
  state.value.message = message;
  state.value.color = color;
};

export const hideSnackbar = () => {
  state.value.visible = false;
  state.value.message = "";
  state.value.color = "";
};
