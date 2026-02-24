import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/Auth';
import UserData from './modules/UserData';
import Notifications from './modules/Notification';
import ErrorMessage from './modules/ErrorMessage';
import menuItems from '../PS-Instellingen/MenuItems.config.js';
import FotoviewerModule from './modules/Fotoviewer';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuItems
    },
    mutations: {},
    actions: {},
    getters: {
        menuItems(state) {
            return state.menuItems;
        }
    },
    modules: {
        Auth,
        UserData,
        Notifications,
        ErrorMessage,
        FotoviewerModule
    }
});
