<template>
    <div>
        <FullscreenLoader v-if="!user" />

        <template v-else>
            <h2 class="oleo">Contactvoorstellen</h2>
            <p>
                Hier vind je een overzicht van de contactvoorstellen die je ontvangen hebt. Klik door om het voorstel te
                bekijken.
            </p>

            <div class="header-bar">Contactvoorstellen</div>
            <table class="mijnps-table">
                <tbody>
                    <tr
                        v-for="voorstel in voorstellen"
                        :key="voorstel.VoorstelID"
                        @click="$router.push(`/voorstellen/${voorstel.VoorstelID}`)"
                        class="table-clickable"
                    >
                        <td
                            :style="{
                                fontWeight: voorstel.Openstaand ? 'bold' : 'normal',
                            }"
                        >
                            {{ voorstel.Voornaam }}
                        </td>
                        <td style="text-transform: capitalize">
                            {{ toonVoorstelDatum(voorstel.Datum_voorstel) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="voorstel-cards">
                <Card
                    v-for="voorstel in voorstellen"
                    :key="voorstel.VoorstelID"
                    :openstaand="voorstel.Openstaand"
                    :voornaam="voorstel.Voornaam"
                    :persoonId="voorstel.PersoonID"
                    :datum="voorstel.Datum_voorstel"
                    :voorstelnummer="voorstel.VoorstelID"
                    :fotocode="voorstel.Foto_zichtbaarheid"
                ></Card>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { toonKorteDatum, toonLangeDatum, toonVoorstelDatum } from '../functions/toonDatum';
    import Card from '../components/Card';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['user', 'voorstellen']),
        },
        components: {
            Card,
        },
        methods: {
            toonKorteDatum,
            toonLangeDatum,
            toonVoorstelDatum,
        },
        mounted() {
            scrollTo(0, 0);
        },
    };
</script>
