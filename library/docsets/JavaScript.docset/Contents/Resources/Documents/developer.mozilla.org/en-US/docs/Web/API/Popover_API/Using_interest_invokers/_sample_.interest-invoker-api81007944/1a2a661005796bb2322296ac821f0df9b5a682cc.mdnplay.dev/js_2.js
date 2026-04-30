
          const supported = Object.hasOwn(
  HTMLButtonElement.prototype,
  "interestForElement",
);
if (!supported) {
  document.querySelector("html").classList.add("no-interest-invokers");
}
const tooltip = document.getElementById("my-tooltip");
const links = document.querySelectorAll("a");
links.forEach((link) => (link.interestForElement = tooltip));
tooltip.addEventListener("interest", (e) => {
  tooltip.textContent = `Interest shown on ${e.source.textContent}`;
});

tooltip.addEventListener("loseinterest", (e) => {
  e.source.textContent += "*";
});
;
        