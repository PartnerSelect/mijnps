const state = {
    msg: null
};

const mutations = {
    SET_ERROR(state, str) {
        state.msg = str;
    },
    CLEAR_ERROR(state) {
        state.msg = null;
    }
};

const actions = {};
const getters = {
    errMessage(state) {
        return state.msg;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
