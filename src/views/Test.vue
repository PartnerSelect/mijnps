<template>
  <div>
    <NieuwsBericht />
    <FullscreenLoader v-if="loaderActive"></FullscreenLoader>
    <Dialog @closeDialog="handleDialogClose($event)" />
    <slot></slot>

    <h1 class="oleo">h1 class="oleo"</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quod
      tempora dolores sunt ex soluta! Eum omnis, aliquam, minima, eos
      perferendis aut necessitatibus iste numquam nihil veritatis tempore ut
      repellendus.
    </p>

    <hr />

    <h3>Component tests</h3>
    <ErrorMessage />
    <button class="btn" @click="testLoader">Test Fullscreen Loader (3s)</button>
    <button class="btn" @click="testLoaderTimeout">
      Test Fullscreen Loader (timeout / server error - 10s)
    </button>
    <button class="btn" @click="testNotification">Test add notification</button>
    <button class="btn" @click="testErrorMessage">
      Test error message (5s)
    </button>
    <button class="btn" @click="testDialog">Test dialog</button>
    <button class="btn" @click="testPopup">Test popup</button>

    <hr />

    <h2>Forms:</h2>
    <form action="#" class="mijnps-form">
      <h3>Input fields</h3>
      <input type="text" placeholder="text" />
      <input type="email" placeholder="email" />
      <input type="tel" placeholder="tel" />
      <input type="number" placeholder="number" />
      <input type="password" placeholder="password" />

      <h3>Radio buttons</h3>
      <label for="radio1">
        <input type="radio" id="radio1" name="radio" />
        <span>Radio 1</span>
      </label>
      <br />
      <label for="radio2">
        <input type="radio" id="radio2" name="radio" />
        <span>Radio 2</span>
      </label>

      <h3>Checkboxes</h3>
      <label for="check1">
        <input type="checkbox" name="checkbox" id="check1" />
        <span>Checkbox 1</span>
      </label>
      <br />
      <label for="check2">
        <input type="checkbox" name="checkbox" id="check2" />
        <span>Checkbox 2</span>
      </label>

      <h3>Toggler</h3>
      <label for="toggler" class="toggler">
        <input type="checkbox" name="toggler" id="toggler" />
        <span>Toggler</span>
      </label>

      <h3>Textarea</h3>
      <textarea
        name="textarea"
        id="textarea"
        cols="30"
        rows="10"
        placeholder="textarea"
      ></textarea>
    </form>

    <hr />

    <h2>Buttons</h2>
    <p>
      btn:
      <button class="btn">btn</button>
    </p>
    <p>
      btn btn-rounded:
      <button class="btn btn-rounded">btn btn-rounded</button>
    </p>
    <p>
      btn btn-negative:
      <button class="btn btn-negative">btn btn-negative</button>
    </p>
    <hr />
    <h2>Lists</h2>
    <ul class="mijnps-ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </ul>

    <p>&nbsp;</p>

    <ol class="mijnps-ol-nummers">
      <li>Ordered List nummers</li>
      <li>Ordered List nummers</li>
      <li>Ordered List nummers</li>
    </ol>

    <p>&nbsp;</p>

    <ol class="mijnps-ol-letters">
      <li>Ordered list letters</li>
      <li>Ordered list letters</li>
      <li>Ordered list letters</li>
    </ol>
  </div>
</template>

<script>
import ErrorMessage from "../components/ErrorMessage";
import NieuwsBericht from "../components/NieuwsBericht";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loaderActive: false, // Just for testing purposes
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    testLoader() {
      this.loaderActive = true;
      const vm = this;
      setTimeout(() => {
        vm.loaderActive = false;
      }, 3000);
    },
    testLoaderTimeout() {
      this.loaderActive = true;
      const vm = this;
      setTimeout(() => {
        vm.loaderActive = false;
      }, 15000);
    },
    testNotification() {
      this.$store.dispatch("addNotification", "Testing!");
    },
    testErrorMessage() {
      this.$store.commit("SET_ERROR", "Testing");
    },
    async testDialog() {
      this.$dialog.confirm({
        message:
          "This is a dialog. It returns a true or false. Handle that value through a @closeDialog listener. \nClicking the background closes the modal, returns null.",
        header: "Header",
        cancelLabel: "Cancel",
        confirmLabel: "Confirm",
      });
    },
    handleDialogClose(evt) {
      alert(`Dialog returned ${evt}`);
    },
    testPopup() {
      this.$dialog.popup(
        "This is a popup. It cannot be cancelled. It does nothing but notify."
      );
    },
  },
  components: {
    ErrorMessage,
    NieuwsBericht,
  },
  mounted() {
    scrollTo(0, 0);
  },
};
</script>