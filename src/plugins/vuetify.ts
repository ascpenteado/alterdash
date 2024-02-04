import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { VuetifyPreset } from "vuetify/types";

Vue.use(Vuetify);

export const preset: VuetifyPreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
    mobileBreakpoint: 960,
  },
  icons: {
    iconfont: "mdi",
    values: {},
  },
  rtl: false,
  theme: {
    dark: false,
    default: "dark",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
    },
    themes: {
      light: {
        primary: "#424242",
        secondary: "#FFFFFF",
        accent: "#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
      dark: {
        primary: "#212121",
        secondary: "#FFFFFF",
        accent: "#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },
  lang: {
    current: "pt-BR",
    locales: { "pt-BR": {} },
    t: undefined as any,
  },
};
export default new Vuetify(preset);
