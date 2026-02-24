<template>
    <div class="bemiddelaar-card">
        <div class="bemiddelaar-card__img-container">
            <img :src="matchmaker.Foto || ''" :alt="matchmaker.Voornaam" class="bemiddelaar-card__foto" />
        </div>
        <div class="bemiddelaar-card__bemiddelaar">
            <p class="bemiddelaar-card__subkop">Matchmaker</p>
            <h4 class="bemiddelaar-card__naam">{{ matchmaker.Voornaam }}</h4>
        </div>
        <div class="bemiddelaar-card__items">
            <button class="btn" @click.prevent="$router.push('/nieuw-bericht')">Stuur bericht</button>
            <button class="btn" @click.prevent="maakBelafspraak" v-if="belafspraakLink">Maak belafspraak</button>
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
            ...mapGetters(['belafspraakLink', 'user', 'matchmaker']),
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
