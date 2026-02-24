const state = {
    notifications: [],
};
const mutations = {
    SET_NOTIFICATION(state, notification) {
        state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state) {
        state.notifications.shift();
    },
};
const actions = {
    addNotification({ commit }, str) {
        commit('SET_NOTIFICATION', {
            str: str,
            key: Date.now(),
        });
        setTimeout(() => {
            commit('REMOVE_NOTIFICATION');
        }, 5500);
    },
};
const getters = {
    notifications(state) {
        if (state.notifications.length > 0) {
            return state.notifications;
        } else {
            return null;
        }
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
