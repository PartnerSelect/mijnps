<template>
    <transition name="errorAnim" appear>
        <div class="errorMessage" v-if="errMessage">
            <h2 class="oleo-black">Foutmelding</h2>
            <button class="btn btn-negative errorMessage__close" @click="$store.commit('CLEAR_ERROR')">X</button>
            <p v-html="errMessage"></p>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['errMessage']),
        },
        beforeDestroy() {
            this.$store.commit('CLEAR_ERROR');
        },
    };
</script>
