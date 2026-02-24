<template>
  <div class="notification__container">
    <transition-group name="notification-list" appear>
      <div
        class="notification"
        v-for="notification in notifications"
        :key="notification.key"
      >{{notification.str}}</div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["notifications"])
  }
};
</script>