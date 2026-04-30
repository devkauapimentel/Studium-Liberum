
          const supported = Object.hasOwn(
  HTMLButtonElement.prototype,
  "interestForElement",
);
if (!supported) {
  document.querySelector("html").classList.add("no-interest-invokers");
}
;
        