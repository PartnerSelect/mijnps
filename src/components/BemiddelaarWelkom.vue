<template>
    <div class="bemiddelaar-welkom" v-if="matchmaker">
        <div class="bemiddelaar-welkom__tekst">
            <p>
                <strong>Welkom {{ user.Voornaam }},</strong>
                <br />
                <br />
                Dit is mijn.partnerselect.net. In het menu vind je alles rondom je matching, zoals voorstellen, je eigen
                beschrijving, informatie en tips. Bij nieuws ontvang je een e-mail.
                <br />
                <br />
                {{ matchmaker.Voornaam }} ondersteunt je tijdens je traject. Neem contact op via:
                <br />
                <br />
                <strong>
                    <a href="#" @click.prevent="$router.push('/nieuw-bericht')">Stuur bericht</a>
                    {{ belafspraakLink && belafspraakLink !== null ? ' | ' : '' }}
                    <a href="#" @click.prevent="maakBelafspraak" v-if="belafspraakLink">Maak belafspraak</a>
                </strong>
            </p>
            <!-- <p>
                <br />
                Heb je leuke foto's van jezelf?
                <router-link to="/mijn-beschrijving/foto">Klik hier om ze naar ons te sturen!</router-link>
            </p> -->
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
            ...mapGetters(['user', 'matchmaker', 'voorstellen', 'belafspraakLink']),
        },
        methods: {
            maakBelafspraak() {
                if (this.belafspraakLink) {
                    let link = document.createElement('a');
                    link.href = this.belafspraakLink;
                    link.target = '_blank';
                    link.style.display = 'none';
                    link.click();
                }
            },
        },
    };
</script>
