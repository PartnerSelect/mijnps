import axios from '../../axios.config';
import router from '../../router';
import { errorToMessage } from '../../functions/errorHandler';

// import { axiosErrorHandler } from '../../functions/errorHandler';

const state = {
    email: null,
    userId: null,
};
const mutations = {
    LOGIN(state, auth) {
        state.email = auth.email;
        state.userId = auth.userId;
    },
    LOGOUT(state) {
        state.email = null;
        state.userId = null;
        router.replace('/login');
    },
};
const actions = {
    async login({ commit, dispatch }, auth) {
        commit('CLEAR_ERROR');
        try {
            const { email, password } = auth;

            const result = await axios.post('/auth/login', {
                email,
                password,
            });

            commit('LOGIN', result.data);
            dispatch('getUserData');
            router.replace('/home');
        } catch (err) {
            const msg = errorToMessage(err);
            commit('SET_ERROR', msg);
        }
    },
    async logout({ commit }) {
        await axios.post('/auth/logout');
        commit('LOGOUT');
        commit('CLEAR_USER_DATA');
    },
    async refresh({ commit, dispatch }) {
        // TODO: Refresh from token /remember me functie
        const result = await axios.get('/auth/refresh');
        if (result.data !== null) {
            commit('LOGIN', result.data);
            dispatch('getUserData');
            return true;
        } else {
            commit('LOGOUT');
            commit('CLEAR_USER_DATA');
            return false;
        }
    },
    async requestReset(state, email) {
        await axios.post('/auth/wachtwoord-vergeten', {
            email: email,
        });
    },
    async resetPassword({ dispatch, commit }, obj) {
        commit('CLEAR_ERROR');

        try {
            const result = await axios.post('/auth/wachtwoord-reset', {
                token: obj.token,
                password: obj.password,
            });

            if (result.status === 200) {
                dispatch('addNotification', 'Wachtwoord is ingesteld. Je kunt nu met het nieuwe wachtwoord inloggen');
                router.replace('/login');
            } else {
                if (result.status === 401) {
                    commit('SET_ERROR', 'Kon wachtwoord niet wijzigen - Token verlopen of reeds gebruikt');
                } else {
                    commit('SET_ERROR', 'Kon wachtwoord niet wijzigen');
                }
            }
        } catch (err) {
            // console.error(err.response);
            if (err.response.status === 401) {
                commit('SET_ERROR', 'Kon wachtwoord niet wijzigen. ' + err.response.data);
            } else {
                commit('SET_ERROR', 'Kon wachtwoord niet wijzigen');
            }
        }
    },
};
const getters = {
    isLoggedIn(state) {
        return state.userId != null;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
