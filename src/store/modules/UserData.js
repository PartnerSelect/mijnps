import axios from '../../axios.config';
// import AuthModule from './Auth';
import { initBericht } from '../../functions/berichtTemplate';
import { BASE_URL } from '../../PS-Instellingen/constants';

const state = {
    user: null,
    voorstellen: null,
    kandidaten: null,
    berichten: null,
};

const mutations = {
    SET_USER_DATA(state, user) {
        const { klantgegevens, voorstellen, kandidaten } = user;
        state.user = klantgegevens;
        state.voorstellen = voorstellen;
        state.kandidaten = kandidaten;
    },
    CLEAR_USER_DATA(state) {
        state.user = null;
        state.voorstellen = null;
    },
    SET_VOORSTELLEN(state, voorstellen) {
        state.voorstellen = voorstellen;
    },
    SET_BERICHTEN(state, berichten) {
        state.berichten = berichten;
    },
};
const actions = {
    async getUserData({ commit, dispatch }) {
        const result = await axios.get('/gegevens');
        commit('SET_USER_DATA', result.data);
        dispatch('getBerichten');
    },
    async getBerichten({ commit }) {
        const berichten = await axios.get('/berichten');
        commit('SET_BERICHTEN', berichten.data);
    },
    async stuurBericht({ dispatch }, message) {
        const { typeBericht, inhoudBericht } = message;
        const bericht = initBericht();

        bericht.Soort_bericht_code = typeBericht;
        bericht.Bericht = inhoudBericht;

        const bevestiging = await dispatch('verzendBericht', bericht);
        return bevestiging;
    },
    veranderFotoStatus({ state, commit }, payload) {
        const voorstellen = state.voorstellen.map((e) => {
            if (e.VoorstelID === payload.voorstelnummer) {
                e.Foto_zichtbaarheid = 'Wel zien';
            }
            return e;
        });
        commit('SET_VOORSTELLEN', voorstellen);

        axios.post('/toon-foto', {
            Voorstelnummer: payload.voorstelnummer,
        });
    },
    async markeerAlsGelezen({ state, commit }, id) {
        const result = await axios.post('/markeer-als-gelezen', { id });
        if (result.status === 200) {
            const nieuweBerichten = state.berichten.map((e) => {
                if (e.id === id) {
                    e.Door_klant_gelezen = 'Ja';
                }
                return e;
            });
            commit('SET_BERICHTEN', nieuweBerichten);
        }
        return result;
    },
};
const getters = {
    user(state) {
        return state.user;
    },
    matchmaker(state) {
        return state.user.Matchmaker;
    },
    voorstellen(state) {
        return state.voorstellen.sort((a, b) => {
            return new Date(b.Datum_voorstel) - new Date(a.Datum_voorstel);
        });
    },
    berichten(state) {
        return state.berichten;
    },
    belafspraakLink(state) {
        if (!state.user) {
            return null;
        }
        // Belafspraak 5 of 15 minuten indien nog geen voorstel ontvangen
        let afspraakId = '145951000000798060';
        if (state.voorstellen && state.voorstellen.length < 1) {
            afspraakId = '145951000000125136'
        }

        if (state.user.Matchmaker.BookingId && state.user.Matchmaker.BookingId !== '145951000000017010') {
            return `https://afspraak.partnerselect.net/#/customer/${afspraakId}?staffId=${state.user.Matchmaker.BookingId}&Naam=${state.user.Naam}&E-mail=${state.user.Email}&Telefoonnummer=${state.user.Telefoonnummer}`;
        }
        return `https://afspraak.partnerselect.net/#/customer/${afspraakId}?Naam=${state.user.Naam}&E-mail=${state.user.Email}&Telefoonnummer=${state.user.Telefoonnummer}`;
    },
    haalVoorstelnummer(state) {
        return (nummer) => {
            if (!nummer) return null;
            return state.voorstellen?.reduce((a, c) => {
                return c.VoorstelID === nummer ? c : a;
            }, null);
        };
    },
    profielfoto(state) {
        const profielfotoId = state.user?.Profielfoto?.[0].File_Id || null;
        if (profielfotoId) {
            return `${BASE_URL}/foto/${state.user.Id}/${profielfotoId}`;
        } else {
            return null;
        }
    },
    kandidaat(state) {
        return (id) => {
            if (!id) return null;
            return state.kandidaten.reduce((a, c) => {
                return c.Id === id ? c : a;
            }, null);
        };
    },
    ontvangenBerichten(state) {
        if (state.berichten) {
            return state.berichten
                .filter((e) => e.Berichttype === 'Door PS')
                .sort((a, b) => new Date(b.Ontvangen) - new Date(a.Ontvangen));
        }
        return [];
    },
    verzondenBerichten(state) {
        if (state.berichten) {
            return state.berichten
                .filter((e) => e.Berichttype !== 'Door PS')
                .sort((a, b) => new Date(b.Ontvangen) - new Date(a.Ontvangen));
        }
        return [];
    },
    haalBerichtNummer(state) {
        return (id) => {
            if (!id) return null;
            return state.berichten?.reduce((a, c) => {
                return c.id === id ? c : a;
            }, null);
        };
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
