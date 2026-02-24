<template>
  <div class="dialog" v-if="showDialog">
    <transition name="dialogFade" appear>
      <div class="dialog__content">
        <h2 class="oleo-black">{{header}}</h2>
        <p class="dialog__text">{{message}}</p>
        <div class="dialog__buttons">
          <button class="btn" @click="handleConfirm">{{confirmLabel}}</button>
          <button class="btn btn-negative" @click="handleCancel" v-if="cancellable">{{cancelLabel}}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Dialog from "../plugins/dialog-plugin.js";

export default {
  data() {
    return {
      showDialog: false,
      cancellable: true
    };
  },
  methods: {
    handleConfirm() {
      this.$emit("closeDialog", true);
      this.showDialog = false;
    },
    handleCancel() {
      this.$emit("closeDialog", false);
      this.showDialog = false;
    }
  },

  created() {
    const vm = this;
    window.addEventListener("click", function(e) {
      const dialogBg = this.document.querySelector(".dialog");
      if (e.target === dialogBg) {
        vm.$emit("closeDialog", null);
        vm.showDialog = false;
      }
    });
  },
  beforeDestroy() {
    const vm = this;
    window.removeEventListener("click", function(e) {
      const dialogBg = this.document.querySelector(".dialog");
      if (e.target === dialogBg) {
        vm.$emit("closeDialog", null);
      }
    });
  },
  beforeMount() {
    Dialog.event.$on("openDialog", params => {
      const {
        cancellable,
        message,
        header,
        cancelLabel,
        confirmLabel
      } = params;
      this.message = message || "";
      this.header = header || null;
      this.cancelLabel = cancelLabel || "Annuleer";
      this.confirmLabel = confirmLabel || "OK";
      this.cancellable = cancellable;
      this.showDialog = true;
    });
  }
};
</script>
