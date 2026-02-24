<template>
    <div class="mijnps-container" v-touch:swipe.right="openMenu" v-touch:swipe.left="closeMenu">
        <Menu :closeMenu="closeMenu" :burgerMenuOpen="burgerMenuOpen" :toggleMenu="toggleMenu" />
        <NotificationContainer />
        <Fotoviewer />

        <div class="mijnps-content-container">
            <div class="mijnps-content">
                <Belafspraak v-if="isLoggedIn" />
                <router-view></router-view>
            </div>
            <div class="mijnps-footer">&copy; {{ new Date().getFullYear() }} &mdash; PartnerSelect</div>
        </div>
    </div>
</template>

<script>
    import Menu from './components/Menu';
    import Belafspraak from './components/BelafspraakButton';
    import NotificationContainer from './components/Notification';
    import Fotoviewer from './components/Fotoviewer.vue';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                slideStartX: null,
                slideEndX: null,
                burgerMenuOpen: false,
            };
        },
        // async beforeCreate() {
        //     await this.$store.dispatch('refresh');
        // },
        components: {
            Menu,
            Belafspraak,
            NotificationContainer,
            Fotoviewer,
        },
        computed: {
            ...mapGetters(['isLoggedIn']),
        },
        methods: {
            closeMenu() {
                this.burgerMenuOpen = false;
            },
            openMenu() {
                this.burgerMenuOpen = true;
            },
            toggleMenu() {
                this.burgerMenuOpen = !this.burgerMenuOpen;
            },
        },
    };
</script>
