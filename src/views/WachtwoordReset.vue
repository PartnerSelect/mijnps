<template>
    <div>
        <ErrorMessage />

        <form :action="doNothing" class="mijnps-form login-form" v-if="!t">
            <!-- VRAAG WACHTWOORD RESET MAIL AAN -->
            <h2 class="oleo-black">Wachtwoord {{ type === 'activeer' ? '' : 'opnieuw ' }}instellen</h2>
            <p style="line-height: 1.2; margin-bottom: 1rem" v-if="type === 'activeer'">
                Nog één stap om je wachtwoord in te stellen en daarmee Mijn PartnerSelect te activeren.<br /><br />

                Verstuur hieronder het e-mailadres waarmee je bij PartnerSelect ingeschreven staat. Je ontvangt daarna
                binnen 5 minuten een e-mail met een link om het wachtwoord in te stellen.<br /><br />

                Ga hier direct mee aan de slag, want de link is maar 1 uur geldig.
            </p>
            <p style="line-height: 1.2; margin-bottom: 1rem" v-else>
                Verstuur hieronder het emailadres waarmee je bij PartnerSelect ingeschreven staat. Je ontvangt daarna
                binnen 5 minuten een email met een link om het wachtwoord in te stellen. Ga hier direct mee aan de slag,
                want de link is maar 1 uur geldig.
            </p>
            <label for="email">
                Emailadres:
                <br />
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    :class="{ 'form-input-error': emailError }"
                />
            </label>
            <p>
                <button class="btn" @click.prevent="vraagResetAan" :disabled="inBehandeling">Verstuur</button>
            </p>

            <ul class="mijnps-ul clickable reverse-icon" style="margin-top: 3rem">
                <li @click="$router.go(-1)" v-if="inBehandeling">Ga terug</li>
            </ul>
        </form>

        <form action="#" class="mijnps-form login-form" v-if="t">
            <!-- STEL NIEUW WACHTWOORD IN -->
            <h2 class="oleo-black">Wachtwoord (opnieuw) instellen</h2>
            <label for="ww1">
                Nieuw wachtwoord:
                <br />
                <input
                    type="password"
                    name="ww1"
                    id="ww1"
                    v-model="ww1"
                    :class="{ 'form-input-error': formError }"
                    autocomplete="new-password"
                />
            </label>
            <label for="ww2">
                Herhaal wachtwoord:
                <br />
                <input
                    type="password"
                    name="ww2"
                    id="ww2"
                    v-model="ww2"
                    :class="{ 'form-input-error': formError }"
                    autocomplete="new-password"
                    @keydown.enter="resetWachtwoord"
                />
            </label>
            <ul class="mijnps-ul" style="font-size: 1.4rem">
                <li>
                    Minimaal 6 karakters
                    <i :class="[{ ww_req_icon__valid: wwRequirements.isLong }]"></i>
                </li>
                <li>
                    Minimaal 1 hoofdletter
                    <i :class="[{ ww_req_icon__valid: wwRequirements.hasUppercase }]"></i>
                </li>
                <li>
                    Minimaal 1 kleine letter
                    <i :class="[{ ww_req_icon__valid: wwRequirements.hasLowercase }]"></i>
                </li>
                <li>
                    Minimaal 1 cijfer
                    <i :class="[{ ww_req_icon__valid: wwRequirements.hasNumber }]"></i>
                </li>
            </ul>
            <p>
                <button class="btn" @click.prevent="resetWachtwoord()" :disabled="inBehandeling">
                    Stel wachtwoord opnieuw in
                </button>
            </p>
        </form>

        <div class="trustmark">
            <img :src="LogoSectigo" alt="Sectigo" class="trustmark__image" />
            <img :src="LogoBVSK" alt="BVSK Logo" class="trustmark__image" style="height: 80%" />
        </div>
    </div>
</template>

<script>
    import ErrorMessage from '../components/ErrorMessage';
    import { mapActions, mapGetters } from 'vuex';
    import LogoBVSK from '../assets/logo_bvsk.png';
    import LogoSectigo from '../assets/sectigo_trust_seal.png';

    export default {
        data() {
            return {
                ww1: '',
                ww2: '',
                formError: false,
                email: '',
                emailError: false,
                inBehandeling: false,
                LogoBVSK,
                LogoSectigo,
            };
        },
        components: {
            ErrorMessage,
        },
        computed: {
            ...mapGetters(['isLoggedIn']),
            t() {
                return this.$route.query.t || null;
            },
            eml() {
                return this.$route.query.eml || null;
            },
            wwRequirements() {
                return {
                    isLong: this.ww1.length >= 6,
                    hasUppercase: this.ww1.match(/[A-Z]/) || false,
                    hasLowercase: this.ww1.match(/[a-z]/) || false,
                    hasNumber: this.ww1.match(/[0-9]/) || false,
                };
            },
            type() {
                return this.$route.query.type || null;
            },
        },
        mounted() {
            scrollTo(0, 0);
            if (this.isLoggedIn) {
                this.$router.replace('/home');
                return;
            }
            if (this.eml !== null) {
                this.email = this.eml;
            }
        },
        methods: {
            ...mapActions(['addNotification', 'requestReset', 'resetPassword']),
            doNothing() {
                return;
            },
            vraagResetAan() {
                this.inBehandeling = true;
                this.emailError = false;
                if (!this.email.match(/.+@.+\..{2,5}/)) {
                    this.emailError = true;
                    this.addNotification('Vul een geldig email adres in');
                    this.inBehandeling = false;
                    return;
                }
                this.requestReset(this.email).then(() => {
                    this.$router.replace(`/bedankt?type=reset&eml=${this.email}`);
                });
            },
            resetWachtwoord() {
                this.inBehandeling = true;
                this.formError = false;
                if (!this.ww1 || !this.ww2) {
                    this.formError = true;
                    this.addNotification('Vul beide wachtwoord velden in');
                    this.inBehandeling = false;
                    return;
                }
                if (this.ww1 != this.ww2) {
                    this.formError = true;
                    this.addNotification('De wachtwoorden zijn niet gelijk aan elkaar');
                    this.inBehandeling = false;
                    return;
                }
                if (Object.values(this.wwRequirements).includes(false)) {
                    this.formError = true;
                    this.addNotification('Het wachtwoord voldoet niet aan de vereisten');
                    this.inBehandeling = false;
                    return;
                }

                this.resetPassword({
                    password: this.ww1,
                    token: this.t,
                });
            },
        },
    };
</script>

<style>
    .ww_req_icon__valid::after {
        font-weight: 900;
        content: '\2713';
        color: green;
    }
</style>
