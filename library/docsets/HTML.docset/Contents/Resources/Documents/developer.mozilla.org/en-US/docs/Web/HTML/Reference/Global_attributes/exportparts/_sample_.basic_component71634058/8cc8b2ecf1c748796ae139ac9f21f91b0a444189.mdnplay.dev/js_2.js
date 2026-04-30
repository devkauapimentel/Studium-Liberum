
          customElements.define(
  "card-component",
  class extends HTMLElement {
    constructor() {
      super(); // Always call super first in constructor
      const template = document.getElementById("card-component-template");
      const shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(document.importNode(template.content, true));
    }
  },
);
;
        