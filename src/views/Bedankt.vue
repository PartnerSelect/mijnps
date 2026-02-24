<template>
    <div class="bedankt">
        <div class="bedankt_img-container">
            <img :src="Duim" alt="Gelukt!" class="bedankt__img" />
        </div>

        <div class="bedankt__text-container">
            <template v-if="type === 'pb'">
                <h3>Wijzigingen verzonden!</h3>
                <ul class="mijnps-ul">
                    <li>Wij verwerken de wijzigingen. Deze zie je niet direct terug</li>
                    <li>Zodra we de wijzigingen verwerkt hebben, sturen we bericht.</li>
                    <li>Wanneer je dit bericht ontvangen hebt zijn de wijzigingen zichtbaar op Mijn PartnerSelect.</li>
                </ul>
            </template>

            <template v-if="type === 'foto'">
                <h3>Foto's verzonden!</h3>
                <p>
                    Bedankt voor het uploaden van de foto's. Wij ontvangen deze foto's en slaan deze op bij jouw
                    gegevens. Jouw matchmaker maakt een inschatting welke foto het meest geschikt is bij jouw profiel.
                </p>
            </template>

            <template v-if="type === 'bericht'">
                <h3>Het bericht is verzonden!</h3>
                <p>We proberen een bericht altijd binnen 2 werkdagen te beantwoorden.</p>
            </template>

            <template v-if="type === 'reactie'">
                <h3>De reactie op het voorstel is verzonden!</h3>
                <p>
                    We verwerken de reactie bij het voorstel en sturen daarvan een bevestiging. Soms zijn er van onze
                    kant nog wat vragen over een reactie. Deze staan dan ook in het bericht.
                </p>
            </template>

            <template v-if="type === 'reset'">
                <h3>Een e-mail is onderweg</h3>
                <p>
                    Als dit account bestaat wordt er een email verzonden naar
                    <strong>{{ eml }}</strong
                    >. Hierin vind je een link om het wachtwoord in te stellen.
                </p>
                <p>
                    Het kan tot 2 minuten duren voordat je deze mail ontvangt. Controleer voor de zekerheid ook de
                    spambox.
                </p>
            </template>

            <template v-if="type !== 'reset'">
                <button class="btn btn-rounded" @click="$router.push('/home')" style="margin-top: 1rem">
                    Terug naar beginpagina
                </button>
            </template>
        </div>
    </div>
</template>

<script>
    import Duim from '../assets/duimpje.png';

    export default {
        data() {
            return {
                Duim,
            };
        },
        computed: {
            type() {
                if (this.$route.query.type) {
                    return this.$route.query.type;
                } else {
                    return null;
                }
            },
            eml() {
                return this.$route.query.eml || null;
            },
        },
    };
</script>
