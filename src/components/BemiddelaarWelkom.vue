<template>
    <div class="bemiddelaar-welkom" v-if="matchmaker">
        <div class="bemiddelaar-welkom__foto-container">
            <img :src="matchmaker.Foto || ''" :alt="matchmaker.Voornaam" class="bemiddelaar-card__foto" />
        </div>

        <div class="bemiddelaar-welkom__tekst">
            <p>
                Welkom {{ user.Voornaam }},
                <br />
                <br />
                Mijn naam is {{ matchmaker.Voornaam }}. Ik ben jouw matchmaker. Je kunt me bereiken via
                <a href="/nieuw-bericht" @click.prevent="$router.push('/nieuw-bericht')">een bericht</a> of je kunt een
                <BelLink>belafspraak in mijn agenda maken</BelLink>. Ik ben je graag van dienst.
            </p>
            <p>
                <br />
                Heb je leuke foto's van jezelf?
                <router-link to="/mijn-beschrijving/foto">Klik hier om ze naar ons te sturen!</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['user', 'matchmaker', 'voorstellen']),
        },
    };
</script>
