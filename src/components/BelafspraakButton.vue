<template>
    <div class="belafspraak" @click="maakAfspraak" v-if="belafspraakLink && fotolijst === null">
        <div class="belafspraak__tekst">Maak een belafspraak</div>

        <img :src="TelefoonImage" alt="Belafspraak" class="belafspraak__img" />
    </div>
</template>

<script>
    import TelefoonImage from '../assets/analog-phone.svg';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                TelefoonImage,
            };
        },
        computed: {
            ...mapGetters(['belafspraakLink', 'user', 'fotolijst']),
        },
        methods: {
            ...mapActions(['addNotification']),
            maakAfspraak() {
                if (this.belafspraakLink) {
                    let link = document.createElement('a');
                    link.href = this.belafspraakLink;
                    link.target = '_blank';
                    link.style.display = 'none';
                    link.click();
                } else {
                    this.addNotification('De terugbelagenda is momenteel niet bereikbaar. Probeer het later opnieuw.');
                }
            },
        },
    };
</script>
