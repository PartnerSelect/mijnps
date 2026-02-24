<template>
    <div class="mijnps-bericht">
        <FullscreenLoader v-if="!user || !bericht" />
        <template v-else>
            <h2 class="oleo">Bericht: {{ bericht.Onderwerp }}</h2>
            <table class="mijnps-table">
                <tr>
                    <td>Afzender</td>
                    <td>{{ bericht.Afzender }}</td>
                </tr>
                <tr>
                    <td>Onderwerp</td>
                    <td>{{ bericht.Onderwerp }}</td>
                </tr>
                <tr>
                    <td>Datum</td>
                    <td>{{ toonLangeDatum(bericht.Ontvangen) }}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{{ bericht.Door_klant_gelezen === 'Ja' ? 'Gelezen' : 'Ongelezen' }}</td>
                </tr>
                <tr>
                    <td>
                        <a href="#" @click.prevent="$router.go(-1)">&larr; Ga terug</a>
                    </td>
                </tr>
            </table>

            <div class="mijnps-bericht__bericht" v-html="bericht.Bericht"></div>

            <div v-if="bericht.Berichttype === 'Door PS'" style="margin-top: 2.5rem">
                <button class="btn" @click.prevent="$router.push(`/nieuw-bericht?reactie=${bericht.id}`)">
                    Stuur reactie
                </button>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { toonLangeDatum } from '../functions/toonDatum';

    export default {
        data() {
            return {
                gelezenTimeout: null,
            };
        },
        computed: {
            ...mapGetters(['user']),
            bericht() {
                return this.$store.getters.haalBerichtNummer(this.$route.params.id);
            },
        },
        methods: {
            ...mapActions(['markeerAlsGelezen']),
            toonLangeDatum,
        },
        watch: {
            bericht(newValue) {
                if (newValue.Door_klant_gelezen !== 'Ja') {
                    const berichtNummer = newValue.id;
                    const vm = this;

                    this.gelezenTimeout = setTimeout(() => {
                        vm.markeerAlsGelezen(berichtNummer).catch(() => console.warn('Fout bij markeren als gelezen'));
                    }, 1200);
                }
            },
        },
        mounted() {
            scrollTo(0, 0);
            if (this.bericht && this.bericht.Door_klant_gelezen !== 'Ja') {
                const berichtNummer = this.bericht.id;
                const vm = this;

                this.gelezenTimeout = setTimeout(() => {
                    vm.markeerAlsGelezen(berichtNummer).catch(() => console.warn('Fout bij markeren als gelezen'));
                }, 1200);
            }
        },
        beforeDestroy() {
            clearTimeout(this.gelezenTimeout);
        },
    };
</script>
