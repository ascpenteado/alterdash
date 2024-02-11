import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { vMaska } from "maska";

Vue.config.productionTip = false;

Vue.directive("maska", vMaska);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
