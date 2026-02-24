<template>
    <div>
        <div class="header-bar">
            <span>Ontvangen berichten</span>
            <div class="pagination">
                <span class="clickable" @click="pageDown">&lt;</span>
                <span>{{ huidigePagina }} / {{ numPaginas }}</span>
                <span class="clickable" @click="pageUp">&gt;</span>
            </div>
        </div>
        <table class="mijnps-table">
            <thead>
                <tr>
                    <th>Afzender</th>
                    <th>Onderwerp</th>
                    <th>Datum</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="bericht in teTonenBerichten"
                    :style="{ fontWeight: bericht.Door_klant_gelezen === 'Nee' ? 'bold' : 'normal' }"
                    :key="bericht.id"
                    class="table-clickable"
                    @click="$router.push(`/berichten/${bericht.id}`)"
                >
                    <td>{{ bericht.Afzender }}</td>
                    <td>{{ bericht.Onderwerp }}</td>
                    <td>{{ toonKorteDatumTijd(bericht.Ontvangen) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { toonKorteDatum, toonLangeDatum, toonKorteDatumTijd } from '../functions/toonDatum';

    export default {
        name: 'OntvangenBerichten',
        data() {
            return {
                startIndex: 0,
                aantalBerichtenPerPagina: 10,
            };
        },
        computed: {
            ...mapGetters(['ontvangenBerichten']),
            numPaginas() {
                // Bereken totaan aanatl pagina's of tenminste één.
                return Math.max(Math.ceil(this.ontvangenBerichten.length / this.aantalBerichtenPerPagina), 1);
            },
            teTonenBerichten() {
                return this.ontvangenBerichten.slice(this.startIndex, this.startIndex + this.aantalBerichtenPerPagina);
            },
            huidigePagina() {
                return Math.ceil((this.startIndex + 1) / 10);
            },
        },
        methods: {
            toonKorteDatum,
            toonLangeDatum,
            toonKorteDatumTijd,
            pageDown() {
                this.startIndex - 10 < 0 ? null : (this.startIndex -= 10);
            },
            pageUp() {
                this.startIndex + 10 >= this.ontvangenBerichten.length
                    ? null
                    : (this.startIndex += this.aantalBerichtenPerPagina);
            },
        },
    };
</script>
