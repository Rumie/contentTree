import ContentTree from './src/App';

export default {
	install: function (Vue) {
		Vue.component('content-tree', ContentTree);
	}
}