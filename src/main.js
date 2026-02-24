import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './css/app.scss';
import Dialog from './plugins/dialog-plugin';
import './registerServiceWorker';
import Vue2TouchEvents from 'vue2-touch-events';
import BelafspraakLink from './components/BelafspraakLink.vue';
import FullscreenLoader from './components/FullscreenLoader.vue';
import { BASE_URL } from './PS-Instellingen/constants';

localStorage.removeItem('mijnps-refreshToken');

Vue.use(Dialog);
Vue.use(Vue2TouchEvents);
Vue.component('BelLink', BelafspraakLink);
Vue.component('FullscreenLoader', FullscreenLoader);

Vue.config.productionTip = false;

Vue.prototype.$baseUrl = BASE_URL;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

// TODO:
/*
- Tijdelijke vulling terwijl PB van voorstel laadt
*/
