<template>
  <a href="belafspraakLink" @click.prevent="maakAfspraak">
    <slot></slot>
  </a>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BelLink",
  computed: {
    ...mapGetters(["belafspraakLink"]),
  },
  methods: {
    ...mapActions(["haalBelafspraakLink", "addNotification"]),
    maakAfspraak() {
      if (this.belafspraakLink) {
        let link = document.createElement("a");
        link.href = this.belafspraakLink;
        link.target = "_blank";
        link.style.display = "none";
        link.click();
      } else {
        this.addNotification(
          "De terugbelagenda is momenteel niet bereikbaar. Probeer het later opnieuw."
        );
      }
    },
  },
};
</script>