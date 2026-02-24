<template>
  <div class="fullscreen-loader__container">
    <template v-if="!timedOut">
      <div class="fullscreen-loader">
        <div class="fullscreen-loader__bar"></div>
        <div class="fullscreen-loader__bar"></div>
        <div class="fullscreen-loader__bar"></div>
        <div class="fullscreen-loader__bar"></div>
        <div class="fullscreen-loader__bar"></div>
      </div>
    </template>

    <!-- If timed out -->
    <template v-if="timedOut">
      <div class="fullscreen-loader__error">
        <div class="p404-content">
          <div class="p404-brand">
            <img :src="PSLogo" alt="Logo PartnerSelect" />
          </div>
          <h3 class="oleo">Er ging iets fout</h3>
          <p
            style="text-align: center; margin-bottom: 1rem;"
          >De gegevens konden niet opgehaald worden. Probeer de pagina te verversen of probeer het later opnieuw.</p>
          <p
            style="text-align: center; margin-bottom: 1rem;"
          >Blijft dit probleem zich voordoen? Neem dan contact op met PartnerSelect via 088-1997000 of info@partnerselect.net</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import PSLogo from "../assets/logo_ps.png";

export default {
  data() {
    return {
      timedOut: false,
      PSLogo
    };
  },
  mounted() {
    const vm = this;
    this.timer = setTimeout(() => {
      vm.timedOut = true;
    }, 7500);
  }
};
</script>