<template>
    <div class="mijnps-pb">
        <FullscreenLoader v-if="!voorstel" />
        <template v-else>
            <button class="btn" @click="$router.go(-1)">Ga terug</button>
            <h2 class="oleo">{{ voorstel.Voornaam }}</h2>
            <button
                class="btn"
                v-if="voorstel.Contact_status === 'In contact' && voorstel.Status === 'Afgesloten'"
                @click="openWindow(afmeldLink)"
            >
                Contact afmelden
            </button>
            <template>
                <div class="mijnps-pb__foto" v-if="voorstel.Foto_zichtbaarheid == 'Wel zien'">
                    <img
                        :src="profielfotoKandidaat"
                        alt="Profielfoto niet gevonden"
                        load="lazy"
                        @click="handleOpenFotos"
                        style="width: 100%; height: 100%; object-fit: cover; margin: 0"
                    />
                    <span class="fototeller" v-if="voorstel.ExtraFotos && voorstel.ExtraFotos.length > 0">
                        Klik hier voor meer foto's
                    </span>
                </div>
                <div
                    class="mijnps-pb__foto nog-geen-foto"
                    style="display: flex; justify-content: center; align-items: center"
                    v-else
                >
                    <h4 class="oleo" style="display: block">
                        Foto {{ voorstel.Foto_zichtbaarheid == 'Niet gekozen' ? 'nog ' : '' }}niet zichtbaar
                    </h4>
                </div>
            </template>
            <div class="mijnps-pb__tekst">
                {{ kandidaatPB }}
            </div>

            <button
                class="btn"
                v-if="voorstel.Foto_zichtbaarheid === 'Niet gekozen' && voorstel.Openstaand"
                style="margin-bottom: 1rem"
                @click="handleToonFoto"
            >
                Spreekt de beschrijving je aan en wil je de foto zien? Klik dan hier om de foto direct zichtbaar te
                maken.
            </button>

            <template v-if="voorstel.Openstaand">
                <ErrorMessage />
                <template v-if="voorstel.Reactie !== 'Geen reactie'">
                    <div class="al-gereageerd">
                        <p>
                            Je hebt al op dit voorstel gereageerd. <br />
                            Binnen 2 werkdagen verwerken we je reactie en sturen daarvan nog een bevestiging. Het is
                            niet nodig opnieuw hieronder je reactie door te geven.
                        </p>
                    </div>
                </template>
                <h3 class="oleo">Reageer op voorstel</h3>

                <form action="#" class="mijnps-form" style="display: block">
                    <label for="reactiePos">
                        <input
                            type="radio"
                            name="reactieBtn"
                            id="reactiePos"
                            value="Positief"
                            v-model="reactieOpVoorstel.reactie"
                        />
                        <span>{{
                            voorstel.Foto_zichtbaarheid === 'Niet gekozen'
                                ? 'Ik reageer positief. (Wil je eerst de foto zien? Gebruik de knop boven dit formulier)'
                                : 'Ik reageer positief. '
                        }}</span>
                    </label>
                    <label for="reactieNeg" style="display: block">
                        <input
                            type="radio"
                            name="reactieBtn"
                            id="reactieNeg"
                            value="Afwijzend"
                            v-model="reactieOpVoorstel.reactie"
                        />
                        <span
                            >Ik reageer afwijzend
                            {{
                                voorstel.Foto_zichtbaarheid === 'Niet gekozen' ? '(De foto wordt niet zichtbaar)' : ''
                            }}</span
                        >
                    </label>

                    <div v-if="wilAfwijzendReageren">
                        <p style="font-weight: bold; margin-top: 1rem">
                            Heb je onze tips bij het reageren op voorstellen al gelezen?
                            <router-link to="/reactietips">Klik hier!</router-link>
                        </p>
                    </div>

                    <div style="margin-top: 1.5rem">
                        <h4>Wat zijn de belangrijkste redenen voor je keuze? (Maximaal 2)</h4>
                        <label
                            ><input
                                type="checkbox"
                                v-model="reactieOpVoorstel.reden['Achtergrond']"
                                :disabled="aantalRedenen === 2 && !reactieOpVoorstel.reden['Achtergrond']"
                            />
                            <span>Achtergrond</span></label
                        ><br />
                        <label
                            ><input
                                type="checkbox"
                                v-model="reactieOpVoorstel.reden['Persoonlijkheidskenmerken']"
                                :disabled="aantalRedenen === 2 && !reactieOpVoorstel.reden['Persoonlijkheidskenmerken']"
                            />
                            <span>Persoonlijkheidskenmerken</span></label
                        ><br />
                        <label
                            ><input
                                type="checkbox"
                                v-model="reactieOpVoorstel.reden['Interesses en bezigheden']"
                                :disabled="aantalRedenen === 2 && !reactieOpVoorstel.reden['Interesses en bezigheden']"
                            />
                            <span>Interesses en bezigheden</span></label
                        ><br />
                        <label
                            ><input
                                type="checkbox"
                                v-model="reactieOpVoorstel.reden['Foto']"
                                :disabled="
                                    (aantalRedenen === 2 && !reactieOpVoorstel.reden['Foto']) ||
                                    voorstel.Foto_zichtbaarheid !== 'Wel zien'
                                "
                            />
                            <span>Foto</span></label
                        ><br />
                    </div>

                    <div style="margin-top: 1.5rem" v-show="reactieOpVoorstel.reactie">
                        <label for="reactieMotivatie"
                            >Motivatie (Een bericht aan je matchmaker. {{ voorstel.Voornaam }} krijgt dit niet te
                            lezen.)</label
                        >
                        <br />
                        <textarea
                            name="reactieMotivatie"
                            id="reactieMotivatie"
                            style="width: 80%; height: 30vh"
                            v-model="reactieOpVoorstel.motivatie"
                        ></textarea>
                    </div>

                    <input
                        type="submit"
                        value="Verstuur reactie"
                        class="btn"
                        :disabled="reactieVerzonden"
                        @click.prevent="handleReactie"
                    />
                </form>
            </template>
            <div style="text-align: center" v-else>
                <hr />
                <em>
                    Het is niet meer mogelijk om op dit voorstel te reageren. Heb je toch vragen over dit voorstel?
                    Stuur dan
                    <a href="/nieuw-bericht" @click.prevent="$router.push('/nieuw-bericht')">een bericht</a>
                    naar jouw contactpersoon of maak <BelLink>een belafspraak</BelLink>.
                </em>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ErrorMessage from '../components/ErrorMessage';
    import { toonKorteDatum } from '../functions/toonDatum';
    import { scrollToTop } from '../functions/scrollFunctions';
    import axios from '../axios.config';
    import AvatarVoorstelMan from '../assets/avatar-voorstel-man.jpeg';
    import AvatarVoorstelVrouw from '../assets/avatar-voorstel-vrouw.jpeg';

    export default {
        data() {
            return {
                reactieOpVoorstel: {
                    reactie: null,
                    motivatie: '',
                    voorstelnummer: this.$route.params.id,
                    reden: {
                        Achtergrond: false,
                        Persoonlijkheidskenmerken: false,
                        'Interesses en bezigheden': false,
                        Foto: false,
                    },
                },
                kandidaatPB: null,
                reactieVerzonden: false,
            };
        },
        computed: {
            ...mapGetters(['user', 'kandidaat', 'matchmaker']),
            voorstel() {
                return this.$store.getters.haalVoorstelnummer(this.$route.params.id);
            },
            kandidaat() {
                return this.$store.getters.kandidaat(this.voorstel?.PersoonID);
            },
            wilAfwijzendReageren() {
                return this.reactieOpVoorstel.reactie === 'NeeZonderFoto';
            },
            profielfotoKandidaat() {
                if (this.kandidaat.Profielfoto && this.kandidaat.Profielfoto.length > 0) {
                    return `${this.$baseUrl}/foto/${this.kandidaat.Id}/${this.kandidaat.Profielfoto[0].File_Id}`;
                } else {
                    return this.kandidaat.Geslacht === 'M' ? AvatarVoorstelMan : AvatarVoorstelVrouw;
                }
            },
            aantalRedenen() {
                const aantal = Object.values(this.reactieOpVoorstel.reden).reduce((a, c) => (c ? a + 1 : a), 0);
                return aantal;
            },
            redenenArray() {
                const output = Object.entries(this.reactieOpVoorstel.reden).reduce((a, c) => {
                    if (c[1]) a.push(c[0]);
                    return a;
                }, []);
                return output;
            },
            afmeldLink() {
                const email = this.matchmaker.Email.match(/matchmakers@matchmaker/g)
                    ? 'info@partnerselect.net'
                    : this.matchmaker.Email;
                return `https://formulier.partnerselect.net/partnerselect/form/Vragenlijstafmeldencontact/formperma/BoOXYv1_Rgh2_D9H33qymPVW_VFpxTlEtIvdwkez6So?vid=${this.voorstel?.VoorstelID}&zid=${this.user?.Id}&mmeml=${email}&naam=${this.user?.Naam}`;
            },
        },
        components: {
            ErrorMessage,
        },
        methods: {
            ...mapActions(['stuurReactieOpVoorstel', 'addNotification', 'veranderFotoStatus', 'setFotos']),
            scrollToTop,
            toonKorteDatum,
            openWindow(link) {
                window.open(link, '_blank');
                return;
            },
            handleOpenFotos() {
                this.setFotos(this.kandidaat);
            },
            async haalPB() {
                if (this.voorstel?.VoorstelID) {
                    const pb = await axios.get(`/pb/${this.voorstel.VoorstelID}`);
                    this.kandidaatPB = pb.data;
                }
            },
            handleToonFoto() {
                this.veranderFotoStatus({
                    voorstelnummer: this.voorstel.VoorstelID,
                    zichtbaarheid: 'Wel zien',
                });
                this.scrollToTop();
            },
            async handleReactie() {
                this.reactieVerzonden = true;

                const reactie = {
                    ID_Persoon_1: this.user.Id,
                    ID_Voorstel: this.voorstel.VoorstelID,
                    Motivatie: this.reactieOpVoorstel.motivatie,
                    Reactie_Type: this.reactieOpVoorstel.reactie,
                    Bericht_Type: 'Reactie op voorstel',
                    Redenen_P1: this.redenenArray,
                };

                // Geen reactie gekozen
                if (!reactie.Reactie_Type) {
                    this.$store.commit('SET_ERROR', 'Nog geen reactie gekozen. Kies positief of afwijzend.');
                    this.reactieVerzonden = false;
                    return;
                }

                // Geen lege afwijzende reacties
                if (reactie.Reactie_Type === 'Afwijzend' && reactie.Motivatie.length < 4) {
                    this.$store.commit(
                        'SET_ERROR',
                        'Een motivatie bij een afwijzende reactie is belangrijk. Graag vernemen wij de reden van afwijzing.'
                    );
                    this.reactieVerzonden = false;
                    return;
                }

                // Geen reden opgegeven
                if (this.aantalRedenen === 0) {
                    this.$store.commit('SET_ERROR', 'Geef aan wat de voornaamste reden(en) zijn voor jouw reactie');
                    this.reactieVerzonden = false;
                    return;
                }

                // Verstuur reactie
                try {
                    const result = await axios.post('/reactie', reactie);
                    if (result.status === 200) {
                        this.addNotification('Reactie verzonden');
                        this.reactieVerzonden = true;
                        this.$router.push('/bedankt?type=reactie');
                    } else {
                        // console.err(result);
                        this.$store.commit('SET_ERROR', 'Er ging iets fout met de reactie');
                        this.reactieVerzonden = false;
                    }
                } catch (err) {
                    // console.error(err);
                }
            },
        },
        mounted() {
            scrollTo(0, 0);
            // console.log('Voorstel:', this.voorstel);
            // console.log('Matchmaker:', this.matchmaker);
            // console.log('User:', this.user);
        },
        watch: {
            kandidaat: {
                deep: true,
                immediate: true,
                flush: 'post',
                handler() {
                    this.haalPB();
                },
            },
        },
    };
</script>

<style lang="scss">
    .al-gereageerd {
        padding: 1rem;
        background: rgba($color: #ff5500, $alpha: 0.7);
        margin-top: 0.8rem;
        display: block;
    }

    .nog-geen-foto {
        &::before {
            content: 'Lees eerst de beschrijving. Indien gewenst kan dan de foto getoond worden.';
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f50;
            color: black;
            text-align: center;
            padding: 0.5rem;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.2s ease;
            overflow: hidden;
        }

        &:hover::before {
            opacity: 0.95;
        }
    }
</style>
