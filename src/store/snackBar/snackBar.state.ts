import { reactive } from "vue";

type SnackbarColor = "error" | "success" | "warning" | "info";

type SnackbarState = {
  visible: boolean;
  message: string | string[];
  color: SnackbarColor | null;
  /**
   * Time in milliseconds to hide the snackbar;
   */
  timeout: number;
};

export const state = reactive<SnackbarState>({
  visible: false,
  message: "",
  color: null,
  timeout: 3000,
});

export const showSnackbar = (
  message: string | string[],
  color: SnackbarColor,
  timeout?: number
) => {
  state.visible = true;
  state.message = message;
  state.color = color;
  state.timeout = timeout || 3000;
};

export const hideSnackbar = () => {
  state.visible = false;
  state.message = "";
  state.color = null;
  state.timeout = 3000;
};
