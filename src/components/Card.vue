<template>
    <div class="card">
        <template>
            <img
                v-if="fotocode == 'Wel zien'"
                :src="pbfoto"
                alt="Profielfoto niet gevonden"
                class="card__foto"
                load="lazy"
                @click="$router.push(`/voorstellen/${voorstelnummer}`)"
            />
            <div
                class="card__foto"
                v-else
                style="display: flex; justify-content: center; align-items: center"
                @click="$router.push(`/voorstellen/${voorstelnummer}`)"
            >
                <h4 class="oleo" style="display: block">
                    Foto {{ [null, 'Niet gekozen'].includes(fotocode) ? 'nog ' : '' }}niet zichtbaar
                </h4>
            </div>
        </template>
        <div class="card__content">
            <h4 class="oleo card__naam">{{ voornaam }}</h4>
            <p class="card__datum" :style="{ 'font-weight': openstaand ? 'bold' : 'normal' }">
                Verzonden: {{ toonVoorstelDatum(datum) }} {{ contactStatus === 'In contact' ? '(In contact)' : '' }}
            </p>
            <p v-if="contactStatus === 'In contact'"><a :href="afmeldLink" target="_blank">Contact afmelden</a></p>
            <button
                class="btn btn-rounded card__btn"
                @click="$router.push(`/voorstellen/${voorstelnummer}`)"
                :style="{ 'font-weight': openstaand ? 'bold' : 'normal' }"
            >
                Bekijk het voorstel
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { toonLangeDatum, toonKorteDatum, toonVoorstelDatum } from '../functions/toonDatum';
    import AvatarVoorstelMan from '../assets/avatar-voorstel-man.jpeg';
    import AvatarVoorstelVrouw from '../assets/avatar-voorstel-vrouw.jpeg';

    export default {
        data() {
            return {};
        },
        props: ['voorstelnummer', 'voornaam', 'datum', 'openstaand', 'fotocode', 'persoonId', 'contactStatus'],
        computed: {
            ...mapGetters(['kandidaat', 'matchmaker', 'user']),
            pbfoto() {
                const persoon = this.kandidaat(this.persoonId);
                const fileId = persoon?.Profielfoto?.[0].File_Id || null;
                if (fileId) {
                    return `${this.$baseUrl}/foto/${this.persoonId}/${fileId}`;
                } else {
                    return persoon.Geslacht === 'M' ? AvatarVoorstelMan : AvatarVoorstelVrouw;
                }
            },
            afmeldLink() {
                const email = this.matchmaker.Email.match(/matchmakers@matchmaker/g)
                    ? 'info@partnerselect.net'
                    : this.matchmaker.Email;
                return `https://formulier.partnerselect.net/partnerselect/form/Vragenlijstafmeldencontact/formperma/BoOXYv1_Rgh2_D9H33qymPVW_VFpxTlEtIvdwkez6So?vid=${this.voorstelnummer}&zid=${this.user?.Id}&mmeml=${email}&naam=${this.user?.Naam}`;
            },
        },
        methods: {
            toonLangeDatum,
            toonKorteDatum,
            toonVoorstelDatum,
        },
    };
</script>
