const state = {
    fotos: null,
    fotoUserId: null,
};

const mutations = {
    SET_FOTOLIJST(state, lijst) {
        const { fotoLijst, userId } = lijst;
        state.fotos = fotoLijst;
        state.fotoUserId = userId;
    },
    CLEAR_FOTOLIJST(state) {
        state.fotos = null;
        state.fotoUserId = null;
    },
};

const actions = {
    setFotos({ commit }, user) {
        commit('CLEAR_FOTOLIJST');
        const arr = [];
        if (user.Profielfoto?.length > 0) {
            arr.push(user.Profielfoto[0].File_Id);
        }

        if (user.ExtraFotos?.length > 0) {
            user.ExtraFotos.map((e) => {
                arr.push(e.File_Id);
            });
        }

        commit('SET_FOTOLIJST', {
            fotoLijst: arr,
            userId: user.Id,
        });
    },
    clearFotos({ commit }) {
        commit('CLEAR_FOTOLIJST');
    },
};
const getters = {
    fotolijst(state) {
        return state.fotos;
    },
    fotoUserId(state) {
        return state.fotoUserId;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
