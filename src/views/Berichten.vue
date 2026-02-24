<template>
    <div>
        <FullscreenLoader v-if="!user" />
        <template v-else>
            <div class="functie-buttons">
                <button class="btn" @click="$router.push('/nieuw-bericht')">Nieuw bericht</button>
            </div>

            <!-- Ontvangen berichten -->
            <OntvangenBerichten />

            <!-- Verzonden berichten -->
            <VerzondenBerichten />
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { toonKorteDatum, toonLangeDatum } from '../functions/toonDatum';
    import OntvangenBerichten from '../components/OntvangenBerichten';
    import VerzondenBerichten from '../components/VerzondenBerichten';

    export default {
        name: 'Berichten',
        data() {
            return {};
        },
        mounted() {
            scrollTo(0, 0);
        },
        components: {
            OntvangenBerichten,
            VerzondenBerichten,
        },
        computed: {
            ...mapGetters(['user', 'verzondenBerichten', 'ontvangenBerichten']),
        },
        methods: {
            toonKorteDatum: toonKorteDatum,
            toonLangeDatum: toonLangeDatum,
        },
    };
</script>
