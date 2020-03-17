import App from './App.vue';
import Sample from './sample.vue';

export default {
	install: function (Vue) {
		Vue.component('content-tree', App);
		Vue.component('sample', Sample);
	}
}