import "vue-slider-component/theme/default.css";
import { Input, Tree } from "element-ui";
import VueSlider from "vue-slider-component";
import App from './App.vue';

export default {
  install(Vue) {
    Vue.component("content-tree-slider", VueSlider);
    Vue.component(Input.name, Input);
    Vue.component(Tree.name, Tree);
    Vue.component("rum-content-tree", App);
  }
}
