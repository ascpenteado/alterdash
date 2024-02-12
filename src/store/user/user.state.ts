import { Module } from "vuex";

type UserState = {
  email: string;
  foto: string;
  nome: string;
  themePreference: "light" | "dark" | "system";
};

const initialState: UserState = {
  email: "",
  foto: "",
  nome: "",
  themePreference: "system",
};

const userModule: Module<UserState, any> = {
  state: initialState,
  mutations: {
    setEmail(state, email: string) {
      state.email = email;
    },
    setPhoto(state, photo: string) {
      state.foto = photo;
    },
    setName(state, name: string) {
      state.nome = name;
    },
    setThemePreference(state, theme: "light" | "dark" | "system") {
      state.themePreference = theme;
    },
  },
};

export default userModule;
