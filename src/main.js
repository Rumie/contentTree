import Vue from 'vue'
import App from './App.vue'
import store from './store'

import "@/assets/css/normalize.css";
import "@/assets/css/constants.css";
import "vue-slider-component/theme/default.css";

import VModal from "vue-js-modal";
import { Input, Tree } from "element-ui";
import VueSlider from "vue-slider-component";
Vue.component("content-tree-slider", VueSlider);
Vue.component(Input.name, Input);
Vue.component(Tree.name, Tree);
Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
