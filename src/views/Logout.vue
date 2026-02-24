<template>
  <h3
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
  >Je wordt uitgelogd.</h3>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout");
  }
};
</script>