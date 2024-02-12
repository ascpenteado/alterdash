import Vue from "vue";
import { vMaska } from "maska";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.directive("maska", vMaska);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
