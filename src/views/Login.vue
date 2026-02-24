<template>
    <div>
        <div :action="doNothing" class="mijnps-form login-form">
            <ErrorMessage />
            <h1 class="oleo-black">Inloggen bij Mijn PartnerSelect</h1>
            <form method="POST">
                <label for="email">
                    Email adres:
                    <input type="email" name="email" id="email" v-model="email" autocomplete="username" />
                </label>

                <label for="wachtwoord">
                    <div class="ww-div">
                        <span>Wachtwoord:</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            autocomplete="current-password"
                            ref="wwField"
                            @keydown.enter="handleLoginClick"
                        />
                        <i class="show-pw-button" @click="showPasswordAsText"></i>
                    </div>
                </label>
            </form>

            <!-- <label for="onthoudWachtwoord">
                <input type="checkbox" name="onthoudWachtwoord" id="onthoudWachtwoord" v-model="onthoudMe" />
                <span>Onthoud mij op dit apparaat</span>
            </label> -->
            <p>
                <button class="btn btn-rounded" @click.prevent="handleLoginClick">Inloggen</button>
            </p>
            <ul class="mijnps-ul clickable" style="margin-top: 3rem">
                <li @click="$router.push('/reset-wachtwoord')">Ik ben mijn wachtwoord vergeten</li>
                <li @click="toggleExtraInfo('help')">Inloggen lukt niet</li>
                <div class="inloghulp" v-if="showHelp" style="margin-bottom: 1rem">
                    <h3 class="oleo oleo-black">Problemen met inloggen?</h3>
                    <ul class="mijnps-ul mijnps-ul-alt">
                        <li>Controleer het email adres. Dit moet het emailadres zijn waarmee je je inschreef.</li>
                        <li>Wachtwoord vergeten? Vraag dan via de link hierboven een wachtwoord reset aan.</li>
                    </ul>
                </div>
                <li @click="toggleExtraInfo('lidmaatschap')">Ben je nog niet ingeschreven?</li>
                <div class="inloghulp" v-if="showNoMember" style="line-height: 1.5">
                    <p style="margin-top: 1rem">
                        Mijn PartnerSelect is de digitale interface van PartnerSelect. Ben je ingeschreven, dan kun je
                        via deze weg je matches bekijken en erop reageren, alle contacten met je matchmaker onderhouden
                        en je vindt er alle informatie om jouw weg naar een duurzame relatie succesvol te laten
                        verlopen.
                    </p>
                    <p style="margin-top: 1rem">
                        Maak je nog geen gebruik van onze matching en ben je benieuwd wat je van ons kunt verwachten?
                        <a href="https://www.partnerselect.net/slagingskanstest/">Doe de slagingskanstest</a> en we
                        informeren je uitgebreid over jouw kansen, onze aanpak & de tarieven.
                    </p>
                </div>
            </ul>
        </div>

        <div class="trustmark">
            <img :src="LogoSectigo" alt="Sectigo" class="trustmark__image" />
            <img :src="LogoBVSK" alt="BVSK Logo" class="trustmark__image" style="height: 80%" />
        </div>
    </div>
</template>

<script>
    import ErrorMessage from '../components/ErrorMessage';
    import LogoBVSK from '../assets/logo_bvsk.png';
    import LogoSectigo from '../assets/sectigo_trust_seal.png';

    export default {
        data() {
            return {
                email: null,
                password: null,
                onthoudMe: false,
                showHelp: false,
                showNoMember: false,
                LogoBVSK,
                LogoSectigo,
            };
        },
        components: {
            ErrorMessage,
        },
        created() {
            if (this.$route.query.eml) {
                this.email = this.$route.query.eml;
            }

            if (this.$store.getters.isLoggedIn) {
                this.$router.replace('/home');
            }
        },
        computed: {
            eml() {
                return this.$route.query.eml || null;
            },
        },
        methods: {
            handleLoginClick() {
                const auth = {
                    email: this.email,
                    password: this.password,
                    onthoudMe: this.onthoudMe,
                };
                this.$store.dispatch('login', auth);
                // this.password = null;
            },
            doNothing() {
                return;
            },
            showPasswordAsText() {
                return this.$refs.wwField.type === 'password'
                    ? (this.$refs.wwField.type = 'text')
                    : (this.$refs.wwField.type = 'password');
            },
            toggleExtraInfo(type) {
                if (type === 'help') {
                    this.showNoMember = false;
                    this.showHelp = !this.showHelp;
                }

                if (type === 'lidmaatschap') {
                    this.showHelp = false;
                    this.showNoMember = !this.showNoMember;
                }
            },
        },
    };
</script>

<style>
    .temp_announcement {
        padding: 1rem 0.5rem 2rem;
        line-height: 1.2;
    }

    .ww-div {
        position: relative;
    }

    .show-pw-button {
        position: absolute;
        height: 100%;
        width: auto;
        top: 50%;
        right: 0;
        margin-left: auto;
        cursor: pointer;
        padding: 0 12px;
    }

    .show-pw-button::after {
        content: '\01f441';
        color: rgba(black, 0.9);
        font-size: inherit;
    }
</style>
