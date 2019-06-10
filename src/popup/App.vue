<template>
  <div class="extension">
    <h1>Hi there! 👋 Hope you're doing great!</h1>

    <button v-on:click="writeInConsole">Do the magic!</button>

    <div>
      <h2>Want more magic?</h2>
      <span>Try them:</span>

      <div>
        <input type="radio" v-model="bodyColor" value="#f4eebc">
        <input type="radio" v-model="bodyColor" value="#bfe7c5">
        <input type="radio" v-model="bodyColor" value="#c9daf8">
      </div>

      <h4>even more?</h4>

      <div>
        <input type="radio" v-model="popupBodyColor" value="#bfe7c5">
        <input type="radio" v-model="popupBodyColor" value="#c9daf8">
        <input type="radio" v-model="popupBodyColor" value="#f4eebc">
      </div>
    </div>
  </div>
</template>

<script>
const browser = require("webextension-polyfill");

export default {
  data() {
    return {
      currentColor: "#FFF",
      currentPopupColor: "#FFF"
    };
  },

  computed: {
    bodyColor: {
      get() {
        return this.$data.currentColor;
      },
      set(val) {
        this.$data.currentColor = val;

        browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
          browser.tabs.sendMessage(tabs[0].id, {
            msg: { action: "change_body_color", value: val }
          });
        });
      }
    },

    popupBodyColor: {
      get() {
        return this.$data.currentPopupColor;
      },
      set(val) {
        this.$data.currentPopupColor = val;
        document.body.style.background = val;
      }
    }
  },

  methods: {
    writeInConsole() {
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs
          .sendMessage(tabs[0].id, { msg: { action: "print_in_console" } })
          .then(() => {
            alert(
              "Open the browser's console to see the magic. Need to have at least one tab in some page."
            );
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}

.extension {
  width: 300px;
  text-align: center;
}
</style>
