
          class StarRating extends HTMLElement {
  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.ariaRole = "slider";
    this._internals.ariaBrailleLabel = this.ariaBrailleLabel;
  }

  // …
}

customElements.define("star-rating", StarRating);
const logInternals = document.querySelector("#log");
function log(text) {
  logInternals.innerText = `${logInternals.innerText}${text}\n`;
  logInternals.scrollTop = logInternals.scrollHeight;
}
const el = document.querySelector("star-rating");
log(el._internals.ariaBrailleLabel);
el._internals.ariaBrailleLabel += "*";
log(el._internals.ariaBrailleLabel);
;
        