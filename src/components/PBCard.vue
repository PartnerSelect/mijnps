<template>
    <div class="pb-card">
        <div
            class="pb-card__foto-container"
            @click="handleOpenFotos(user)"
            :style="{ cursor: user.aantal_extra_fotos > 0 ? 'pointer' : 'auto' }"
        >
            <img :src="foto" alt="Profielfoto niet gevonden" class="pb-card__foto" />
            <span class="fototeller" v-if="user.ExtraFotos && user.ExtraFotos.length > 0">
                Klik hier voor meer foto's
            </span>
        </div>
        <div class="pb-card__tekst">
            {{ kortePBTekst }}...
            <div class="pb-card__buttons">
                <button class="btn" @click="$router.push('mijn-beschrijving')">Naar mijn beschrijving</button>
                <button class="btn" @click="$router.push('mijn-beschrijving/edit')">Wijzig beschrijving</button>
                <button class="btn" @click="$router.push('mijn-beschrijving/foto')">Wijzig foto</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AvatarZelfMan from '../assets/avatar-zelf-man.jpeg';
    import AvatarZelfVrouw from '../assets/avatar-zelf-vrouw.jpeg';

    export default {
        computed: {
            ...mapGetters(['user', 'profielfoto']),
            kortePBTekst() {
                let tekst = this.user.PB.substr(0, 600);
                return tekst;
            },
            foto() {
                if (this.profielfoto) {
                    return this.profielfoto;
                } else {
                    return this.user.Geslacht === 'M' ? AvatarZelfMan : AvatarZelfVrouw;
                }
            },
        },
        methods: {
            ...mapActions(['setFotos']),
            handleOpenFotos(user) {
                this.setFotos(user);
            },
        },
    };
</script>
