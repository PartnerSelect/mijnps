<template>
    <FullscreenLoader v-if="!user" />

    <div v-else>
        <Dialog @closeDialog="handleDialogClose($event)" />
        <h2 class="oleo">Verstuur {{ reactieBericht ? 'reactie' : 'nieuw bericht' }}</h2>
        <p>
            Heb je een vraag of suggestie? Terugkoppeling naar je matchmaker of een administratieve vraag? Via
            onderstaande formulier kun je een bericht verzenden.
        </p>

        <ErrorMessage />
        <form action="#" class="mijnps-form">
            <select
                name="typeBericht"
                id="typeBericht"
                size="1"
                v-model="typeBericht"
                :class="{ 'form-input-error': err.typeBericht }"
                @change="checkSendPhotos"
            >
                <option value="Bericht aan matchmaker">
                    Bericht aan matchmaker {{ matchmaker.Voornaam ? `(${matchmaker.Voornaam})` : '' }}
                </option>
                <option value="Stuur foto">Stuur een foto</option>
                <option value="Suggestie / Verbetertip">Suggestie / Verbetertip</option>
                <option value="Klacht">Klacht</option>
                <option value="Administratieve vraag">Administratieve vraag</option>
                <option value="Succesverhaal">Succesverhaal</option>
                <option value="Uitschrijving">Uitschrijving</option>
            </select>

            <textarea
                name="inhoudBericht"
                id="inhoudBericht"
                style="width: 100%; height: 50vh"
                v-model="inhoudBericht"
                :class="{ 'form-input-error': err.inhoudBericht }"
            ></textarea>

            <button class="btn" type="submit" @click.prevent="handleSendMessage">
                Verstuur {{ reactieBericht ? 'reactie' : 'bericht' }}
            </button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ErrorMessage from '../components/ErrorMessage';
    import axios from '../axios.config';

    export default {
        data() {
            return {
                typeBericht: null,
                inhoudBericht: null,
                berichtVerzonden: false,
                isReactie: false,
                err: {
                    typeBericht: false,
                    inhoudBericht: false,
                },
            };
        },
        components: {
            ErrorMessage,
        },
        watch: {
            reactieBericht(old, change) {
                if (change !== null) {
                    this.setReactieBericht();
                }
            },
        },
        computed: {
            ...mapGetters(['matchmaker', 'user', 'haalBerichtNummer']),
            reactieBericht() {
                return this.haalBerichtNummer(this.$route.query.reactie);
            },
        },
        mounted() {
            scrollTo(0, 0);
            const bericht = JSON.parse(sessionStorage.getItem('mijnps-tempBericht'));

            if (this.$route.query.reactie) {
                this.setReactieBericht();
            } else if (bericht && (!this.inhoudBericht || this.inhoudBericht.length === 0)) {
                this.$dialog.confirm({
                    message:
                        'Je hebt eerder een bericht gemaakt dat nog niet verzonden is. Wil je met dit bericht verder gaan?',
                    confirmLabel: 'Ja',
                    cancelLabel: 'Nee',
                });
            }
        },
        beforeDestroy() {
            if (this.inhoudBericht && !this.berichtVerzonden) {
                let tempBericht = {
                    inhoudBericht: this.inhoudBericht,
                    typeBericht: this.typeBericht,
                };
                sessionStorage.setItem('mijnps-tempBericht', JSON.stringify(tempBericht));
            }
        },
        methods: {
            ...mapActions(['addNotification', 'stuurBericht']),
            setReactieBericht() {
                this.typeBericht = 'Antwoord op bericht';
                this.inhoudBericht = `






===================
Reactie op bericht ${new Date(this.reactieBericht.Ontvangen).toLocaleDateString('nl')}:
===================

${this.reactieBericht.Bericht};
`;
            },
            checkSendPhotos(evt) {
                if (evt.target.value === 'Stuur foto') {
                    this.$router.push('/mijn-beschrijving/foto');
                }
            },
            handleDialogClose(evt) {
                if (evt === true && sessionStorage.getItem('mijnps-tempBericht')) {
                    const tempBericht = JSON.parse(sessionStorage.getItem('mijnps-tempBericht'));
                    this.inhoudBericht = tempBericht.inhoudBericht;
                    this.typeBericht = tempBericht.typeBericht;
                } else if (evt === false) {
                    sessionStorage.removeItem('mijnps-tempBericht');
                }
            },
            async handleSendMessage() {
                // Validatie
                this.err.typeBericht = false;
                this.err.inhoudBericht = false;
                if (!this.typeBericht) {
                    this.err.typeBericht = true;
                    this.addNotification('Kies een type bericht');
                }
                if (!this.inhoudBericht || this.inhoudBericht.length === 0) {
                    this.err.inhoudBericht = true;
                    this.addNotification('Je kunt geen lege berichten versturen');
                }
                if (Object.values(this.err).includes(true)) {
                    return;
                } else {
                    // Versturen
                    const bericht = {
                        Bericht_Type: this.typeBericht,
                        Bericht_Inhoud: this.inhoudBericht,
                    };

                    try {
                        const result = await axios.post('/bericht', bericht);
                        if (result.status === 200) {
                            this.addNotification('Bericht verzonden');
                            this.berichtVerzonden = true;
                            sessionStorage.removeItem('mijnps-tempBericht');
                            this.$router.push('/bedankt?type=bericht');
                        } else {
                            this.$store.commit('SET_ERROR', 'Er ging iets mis met versturen');
                        }
                    } catch (err) {
                        console.error('Er ging iets mis met verzenden');
                    }
                }
            },
        },
    };
</script>
