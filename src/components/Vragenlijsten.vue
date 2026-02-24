<template>
    <div class="vragenlijsten">
        <h4>Maak jouw gegevens compleet:</h4>
        <div class="vragenlijsten__item">
            <div>Waarden vragenlijst</div>
            <div><a :href="pvqrrLink" target="_blank" v-if="!user.Pvqrr_afgerond">Ga naar vragenlijst</a></div>
            <div class="vragenlijsten__item--afgerond" v-if="user.Pvqrr_afgerond"></div>
        </div>
        <div class="vragenlijsten__item">
            <div>EQ vragenlijst</div>
            <div><a :href="eqLink" target="_blank" v-if="!user.Eq_afgerond">Ga naar vragenlijst</a></div>
            <div class="vragenlijsten__item--afgerond" v-if="user.Eq_afgerond"></div>
        </div>
        <div class="vragenlijsten__item">
            <div>Persoonlijkheidsvragenlijst</div>
            <div><a :href="tipiLink" target="_blank" v-if="!user.Tipi_afgerond">Ga naar vragenlijst</a></div>
            <div class="vragenlijsten__item--afgerond" v-if="user.Tipi_afgerond"></div>
        </div>
        <div class="vragenlijsten__item">
            <div>Mindset vragenlijst</div>
            <div>
                <a :href="mindsetLink" target="_blank" v-if="!user.Mindset_afgerond">Ga naar vragenlijst</a>
            </div>
            <div class="vragenlijsten__item--afgerond" v-if="user.Mindset_afgerond"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'MatchVragenlijsten',
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['user']),
            pvqrrLink() {
                if (this.user.Geslacht === 'M') {
                    return `https://formulier.partnerselect.net/partnerselect/form/PortraitValuesQuestionnairePVQRRMAN/formperma/yDyuoKfXG1eyPcelVy93AV86j8s_fgKvPREj0tQV27U?zid=${this.user.Id}`;
                } else {
                    return `https://formulier.partnerselect.net/partnerselect/form/PortraitValuesQuestionnairePVQRR/formperma/4pho609_IaLyKHgBUFnfZHomQ9r0BefNoDRJasY2NVo?zid=${this.user.Id}`;
                }
            },
            mindsetLink() {
                return `https://formulier.partnerselect.net/partnerselect/form/MindsetFixedGrowthMindsetQuiz/formperma/vPUIBAYwOkmLZZbXrp_O2cWmAtVQdHTW-36XpiSAHuU?zid=${this.user.Id}`;
            },
            tipiLink() {
                return `https://formulier.partnerselect.net/partnerselect/form/10ItemPersonalityInventoryTIPI/formperma/vBxDadqZ5FK1BOpdLhK_ocidfqglc2Htzbhq6E4wBfU?zid=${this.user.Id}`;
            },
            eqLink() {
                return `https://formulier.partnerselect.net/partnerselect/form/EQEmotioneleIntelligentieTest/formperma/-AJzXgfrKCIiKqtp1E7C6Y4b9i0Uo5OcBRyjKs99t2U?zid=${this.user.Id}`;
            },
        },
    };
</script>
