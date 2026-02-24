<template>
    <div>
        <FullscreenLoader v-if="!user" />
        <template v-else>
            <BemiddelaarWelkom />

            <h1 class="oleo">Overzicht</h1>

            <!-- GEGEVENS TABEL -->
            <div class="header-bar">Mijn gegevens</div>
            <table class="mijnps-table">
                <tr>
                    <td>
                        <strong>Naam:</strong>
                    </td>
                    <td>
                        {{ user.Naam }}
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>E-mailadres:</strong>
                    </td>
                    <td>{{ user.Email }}</td>
                </tr>
            </table>

            <Vragenlijsten
                v-if="!user.Tipi_afgerond || !user.Pvqrr_afgerond || !user.Mindset_afgerond || !user.Eq_afgerond"
            />

            <OngelezenBerichten />

            <!-- VOORSTELLEN TABEL -->
            <div class="header-bar header-bar--m0">Openstaande voorstellen ({{ openstaandeVoorstellen.length }})</div>
            <template v-if="openstaandeVoorstellen.length > 0">
                <div class="voorstel-cards voorstel-cards--home">
                    <Card
                        v-for="voorstel in openstaandeVoorstellen"
                        :key="voorstel.VoorstelID"
                        :persoonId="voorstel.PersoonID"
                        :openstaand="voorstel.Openstaand"
                        :voornaam="voorstel.Voornaam"
                        :profielFoto="voorstel.foto_p2"
                        :datum="voorstel.Datum_voorstel"
                        :voorstelnummer="voorstel.VoorstelID"
                        :fotocode="voorstel.Foto_zichtbaarheid"
                        :contactStatus="voorstel.Contact_status"
                    />
                </div>
            </template>
            <template v-else>
                <p style="text-align: center; margin-bottom: 4rem">
                    Er zijn geen openstaande voorstellen. Klik
                    <router-link to="/voorstellen">hier</router-link> voor het overzicht van alle voorstellen.
                </p>
            </template>

            <!-- CARD -->
            <div class="header-bar header-bar--m0">Mijn beschrijving</div>
            <PBCard />
        </template>
    </div>
</template>

<script>
    import { toonKorteDatum, toonLangeDatum, toonVoorstelDatum } from '../functions/toonDatum';
    import { mapGetters, mapActions } from 'vuex';
    // import ErrorMessage from '../components/ErrorMessage';
    import { errorToMessage } from '../functions/errorHandler';
    // import BemiddelaarCard from '../components/BemiddelaarCard';
    import PBCard from '../components/PBCard';
    import BemiddelaarWelkom from '../components/BemiddelaarWelkom';
    import Card from '../components/Card.vue';
    import axios from '../axios.config';
    import OngelezenBerichten from '../components/OngelezenBerichten.vue';
    import Vragenlijsten from '../components/Vragenlijsten.vue';

    export default {
        data() {
            return {};
        },
        mounted() {
            scrollTo(0, 0);
        },
        methods: {
            ...mapActions(['addNotification', 'changePassword']),
            doNothing() {
                return;
            },
            toonLangeDatum: toonLangeDatum,
            async getFoto(klantId, fotoId) {
                try {
                    const result = await axios.get(`/foto/v2/${klantId}/${fotoId}`);
                    return result.data;
                } catch (err) {
                    // console.error(err);
                }
            },
            toonKorteDatum: toonKorteDatum,
            toonVoorstelDatum,
            wijzigWachtwoord() {
                this.formError = false;
                if (!this.ww1 || !this.ww2) {
                    this.$store.commit('SET_ERROR', 'Vul beide velden in om het wachtwoord te wijzigen');
                    this.formError = true;
                    return;
                }

                if (this.ww1 != this.ww2) {
                    this.$store.commit('SET_ERROR', 'De ingevulde wachtwoorden komen niet overeen.');
                    this.formError = true;
                    return;
                }
                if (Object.values(this.wwRequirements).includes(false)) {
                    this.formError = true;
                    this.addNotification('Het wachtwoord voldoet niet aan de vereisten');
                    return;
                }

                this.$store.commit('CLEAR_ERROR');
                this.changePassword(this.ww1)
                    .then(() => {
                        this.formError = false;
                        this.ww1 = '';
                        this.ww2 = '';
                    })
                    .catch((err) => {
                        const msg = errorToMessage(err);
                        // console.error(msg);
                        this.$store.commit('SET_ERROR', msg);
                    });
            },
        },
        computed: {
            ...mapGetters(['user', 'berichten', 'voorstellen']),
            openstaandeVoorstellen: function () {
                return this.voorstellen.filter((e) => e.Openstaand === true || e.Contact_status === 'In contact');
            },
        },
        components: {
            // ErrorMessage,
            // BemiddelaarCard,
            PBCard,
            BemiddelaarWelkom,
            Card,
            OngelezenBerichten,
            Vragenlijsten,
        },
    };
</script>

<style>
    .ww_req_icon__valid::after {
        font-weight: 900;
        content: '\2713';
        color: green;
    }
</style>
