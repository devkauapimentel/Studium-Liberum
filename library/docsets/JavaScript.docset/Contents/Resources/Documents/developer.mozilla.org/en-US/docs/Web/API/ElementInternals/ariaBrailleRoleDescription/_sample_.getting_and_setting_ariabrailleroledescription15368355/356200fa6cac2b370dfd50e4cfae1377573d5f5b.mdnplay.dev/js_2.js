
          class CustomSlide extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = "slide";
  }

  // …
}

customElements.define("custom-slide", CustomSlide);
const customEl = document.querySelector("custom-slide");
log(customEl.ariaBrailleRoleDescription);
customEl.ariaBrailleRoleDescription = "sd";
log(customEl.ariaBrailleRoleDescription);
;
        