import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./assets/reset.scss";
import VueCompositionApi from "@vue/composition-api";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
