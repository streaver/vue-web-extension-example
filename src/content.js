const browser = require("webextension-polyfill");
// This constant is safe, it's just a string in base 64.
const toShow =
  "IyMjIyMjICAjIyMjIyMjIyAjIyMjIyMjIyAgIyMjIyMjIyMgICAgIyMjICAgICMjICAgICAjIyAjIyMjIyMjIyAjIyMjIyMjIyAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICAjIyAjIyAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAojIyAgICAgICAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICMjICAgIyMgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAogIyMjIyMjICAgICAjIyAgICAjIyMjIyMjIyAgIyMjIyMjICAgIyMgICAgICMjICMjICAgICAjIyAjIyMjIyMgICAjIyMjIyMjIyAgICAgIAogICAgICAjIyAgICAjIyAgICAjIyAgICMjICAgIyMgICAgICAgIyMjIyMjIyMjICAjIyAgICMjICAjIyAgICAgICAjIyAgICMjICAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAjIyAgIyMgICAgICAgIyMgICAgICMjICAgIyMgIyMgICAjIyAgICAgICAjIyAgICAjIyAgIyMjIAogIyMjIyMjICAgICAjIyAgICAjIyAgICAgIyMgIyMjIyMjIyMgIyMgICAgICMjICAgICMjIyAgICAjIyMjIyMjIyAjIyAgICAgIyMgIyMj";

browser.runtime.onMessage.addListener((request, sender) => {
  if (request.msg) {
    if (request.msg.action === "print_in_console") {
      console.log(`%c ${atob(toShow)}`, "color:#38B549;");
    } else if (request.msg.action === "change_body_color") {
      document.body.style.background = request.msg.value;
    }
  }
});
