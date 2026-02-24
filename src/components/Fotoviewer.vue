<template>
    <transition name="fotoviewer-anim" appear>
        <div class="fotoviewer" id="fotoviewer" v-if="fotolijst !== null" @click="checkClose($event)">
            <div class="fotoviewer__foto-container">
                <div class="fotoviewer__btn fotoviewer__prev" v-if="currentFoto > 0" @click="currentFoto--">&lt;</div>
                <div class="fotoviewer__counter" v-if="fotolijst.length > 1">
                    {{ currentFoto + 1 }} / {{ fotolijst.length }}
                </div>
                <img
                    :src="`${$baseUrl}/foto/${fotoUserId}/${fotolijst[currentFoto]}`"
                    alt="Foto"
                    class="fotoviewer__foto"
                    id="fotoviewer__foto"
                />
                <div
                    class="fotoviewer__btn fotoviewer__next"
                    v-if="currentFoto < fotolijst.length - 1"
                    @click="currentFoto++"
                >
                    &gt;
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                currentFoto: 0,
            };
        },
        computed: {
            ...mapGetters(['fotolijst', 'fotoUserId']),
        },
        methods: {
            ...mapActions(['clearFotos']),
            checkClose(evt) {
                if (evt.target.id === 'fotoviewer' || evt.target.id === 'fotoviewer__foto') {
                    this.clearFotos();
                    this.currentFoto = 0;
                }
            },
        },
        mounted() {
            this.currentFoto = 0;
        },
    };
</script>

<style lang="scss">
    .fotoviewer {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        min-height: 100vh;
        width: 100%;
        max-width: 100%;
        top: 0;
        left: 0;
        background: rgba(white, 0.9);

        &__foto-container {
            display: flex;
            position: relative;
            max-height: 100vh;
            max-width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__btn {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 0;
            height: 50px;
            width: 50px;
            background: rgba(black, 0.6);
            color: white;
            font-weight: bold;
            font-size: 2.4rem;
            cursor: pointer;
            transition: background font-weight 0.2s ease;

            &:hover {
                background: rgba(black, 0.95);
                font-weight: bold;
            }
        }

        &__prev {
            left: 0;
        }
        &__next {
            right: 0;
        }

        &__foto {
            display: block;
            min-width: 180px;
            max-width: 100%;
            max-height: 100vh;
            height: auto;
        }

        &__counter {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(black, 0.6);
            color: white;
            padding: 0.5rem;
        }
    }

    .fotoviewer-anim-enter-from,
    .fotoviewer-anim-leave-to {
        opacity: 0;
    }

    .fotoviewer-anim-enter-active,
    .fotoviewer-anim-leave-active {
        transition: opacity 0.25s ease-in-out;
    }
</style>
