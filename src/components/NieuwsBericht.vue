<template>
  <div class="nieuwsbericht" v-if="algemeneBerichten">
    <transition-group name="nieuwsbericht" appear>
      <template v-for="(bericht, i) in algemeneBerichten">
        <div
          :key="bericht.Nr"
          v-if="
            !bericht.isGelezen 
            && bericht.Bericht_actief === '1' 
            && new Date(bericht.DT_bericht_display_van) < Date.now() 
            && new Date(bericht.DT_bericht_display_tm) >= Date.now()"
          :class="[
                        'nieuwsbericht__bericht',
                        { nieuwsbericht__activiteit: bericht.Type_bericht === '1' },
                        { nieuwsbericht__urgent: bericht.Type_bericht === '2' }
                    ]"
        >
          <div class="nieuwsbericht__content-container">
            <h2 class="nieuwsbericht__header">{{ bericht.Onderwerp }}</h2>
            <div class="nieuwsbericht__content" v-html="bericht.Bericht"></div>
          </div>
          <div class="nieuwsbericht__sluiten" @click="berichtGelezen(i)">[ OK ]</div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    berichtGelezen(i) {
      this.$store.dispatch("markeerAlgemeenBerichtAlsGelezen", i);
    },
  },
  computed: {
    ...mapGetters(["algemeneBerichten"]),
  },
};
</script>
