<template>
    <div class="mijnps-edit">
        <Dialog @closeDialog="handleOpgeslagenPB($event)" />
        <FullscreenLoader v-if="!user" />
        <!-- TOON WIJZIGINGEN -->
        <template v-if="wijzigingenVerzonden === false">
            <button class="btn" @click="$router.go(-1)">Ga terug</button>
            <h3 class="oleo">Wijzig de beschrijving</h3>
            <p>
                In onderstaande veld kun je wijzigingen in de tekst doorgeven. Voor het gemak plaatsen we de huidige
                tekst alvast in het veld.
            </p>
            <p>
                <em>Let op:</em> De wijzigingen die je verstuurt worden door ons verwerkt en zijn dus niet direct
                zichtbaar.
            </p>

            <ErrorMessage />

            <form action="#" class="mijnps-form">
                <textarea
                    name="wijzigingenPB"
                    id="wijzigingenPB"
                    style="width: 100%; height: 50vh"
                    v-model="tekstTeWijzigen"
                ></textarea>
                <button type="submit" class="btn" @click.prevent="handleSendPB">Verstuur wijzigingen</button>
            </form>
        </template>
        <!-- SUCCESVOL VERZONDEN -->
        <template v-else>
            <h3 class="oleo">Wijzigingen verzonden</h3>
            <p>
                De wijzigingen voor de beschrijving zijn naar PartnerSelect verzonden. Na verwerking ontvang je bericht
                en kun je de nieuwe beschrijving op Mijn PartnerSelect terugvinden.
            </p>
            <button class="btn" @click="$router.push('/mijn-beschrijving')">Terug naar mijn beschrijving</button>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ErrorMessage from '../components/ErrorMessage';
    import axios from '../axios.config';

    export default {
        data() {
            return {
                tekstTeWijzigen: '',
                wijzigingenVerzonden: false,
            };
        },
        components: {
            ErrorMessage,
        },
        created() {
            if (!this.user) {
                this.$router.replace('/mijn-beschrijving');
            } else {
                this.tekstTeWijzigen = this.user.PB;
            }
        },
        mounted() {
            scrollTo(0, 0);

            const tempBeschrijving = sessionStorage.getItem('mijnps-tempBeschrijving');

            if (tempBeschrijving && tempBeschrijving != this.tekstTeWijzigen) {
                this.$dialog.confirm({
                    message:
                        'Je hebt eerder wijzigingen aangebracht in de beschrijving die je nog niet verzonden hebt. Wil je hiermee verder gaan?',
                    confirmLabel: 'Ja',
                    cancelLabel: 'Nee',
                });
            }
        },
        beforeDestroy() {
            if (this.user && this.tekstTeWijzigen != this.user.PB && !this.wijzigingenVerzonden) {
                sessionStorage.setItem('mijnps-tempBeschrijving', this.tekstTeWijzigen);
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            ...mapActions(['addNotification']),
            handleOpgeslagenPB(evt) {
                if (evt === true) {
                    this.tekstTeWijzigen = sessionStorage.getItem('mijnps-tempBeschrijving');
                } else if (evt === false) {
                    sessionStorage.removeItem('mijnps-tempBeschrijving');
                }
            },
            async handleSendPB() {
                this.$store.commit('CLEAR_ERROR');
                if (this.tekstTeWijzigen.length === 0 || !this.tekstTeWijzigen) {
                    // Validatie lege PB
                    this.$store.commit(
                        'SET_ERROR',
                        'Het veld met wijzigingen is leeg. Dit bericht kan niet verzonden worden.'
                    );
                } else if (this.tekstTeWijzigen === this.user.PB) {
                    // Validatie geen wijzigingen aangebracht
                    this.$store.commit('SET_ERROR', 'Je hebt geen wijzigingen aangebracht.');
                } else {
                    // Versturen
                    try {
                        const result = await axios.post('/wijzig-beschrijving', {
                            Tekst_Beschrijving: this.tekstTeWijzigen,
                        });
                        if (result.status === 200) {
                            this.addNotification('Wijziging verzonden');
                            this.wijzigingenVerzonden = true;
                            sessionStorage.removeItem('mijnps-tempBeschrijving');
                            this.$router.push('/bedankt?type=pb');
                        }
                    } catch (err) {
                        // console.error('Kon wijzigingen niet verzenden');
                        this.$store.commit('SET_ERROR', 'Kon wijzigingen niet versturen');
                    }
                }
            },
        },
    };
</script>
