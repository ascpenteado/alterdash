import Vue from "vue";

export interface ILoginForm extends Vue {
  email: string;
  password: string;
  login: () => Promise<void>;
}
