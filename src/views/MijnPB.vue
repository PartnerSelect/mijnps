<template>
    <div>
        <FullscreenLoader v-if="!user" />

        <template v-else>
            <h2 class="oleo">Mijn beschrijving</h2>

            <!-- Beschrijving -->
            <div class="mijnps-pb">
                <div class="functie-buttons">
                    <button class="btn" @click="$router.push('/mijn-beschrijving/edit')">Wijzig tekst</button>
                    <button class="btn" @click="$router.push('/mijn-beschrijving/foto')">Wijzig foto</button>
                </div>

                <div class="mijnps-pb__foto" :class="{ 'mijnps-pb__foto--groot': fotoGroot }">
                    <img
                        :src="foto"
                        alt="Profielfoto niet gevonden"
                        load="lazy"
                        @click="handleOpenFotos(user)"
                        style="width: 100%; height: 100%; object-fit: cover"
                    />
                    <span class="fototeller" v-if="user.ExtraFotos && user.ExtraFotos.length > 0">
                        nog {{ user.ExtraFotos.length }}
                    </span>
                </div>

                <div class="mijnps-pb__tekst">{{ user.PB }}</div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AvatarZelfMan from '../assets/avatar-zelf-man.jpeg';
    import AvatarZelfVrouw from '../assets/avatar-zelf-vrouw.jpeg';

    export default {
        data() {
            return {
                fotoGroot: false,
            };
        },
        mounted() {
            scrollTo(0, 0);
        },
        computed: {
            ...mapGetters(['user', 'profielfoto']),
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
