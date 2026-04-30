
          const supported = Object.hasOwn(
  HTMLButtonElement.prototype,
  "interestForElement",
);
if (!supported) {
  document.querySelector("html").classList.add("no-interest-invokers");
}
const stylePanel = document.getElementById("style-panel");
const buttons = document.querySelectorAll("button");

let prevStyle = "black-white";
stylePanel.addEventListener("interest", sampleStyle);
stylePanel.addEventListener("loseinterest", revertStyle);
buttons.forEach((button) => button.addEventListener("click", setStyle));
function sampleStyle(e) {
  e.target.className = e.source.className;
}

function revertStyle(e) {
  e.target.className = prevStyle;
}

function setStyle(e) {
  stylePanel.className = e.target.className;
  prevStyle = e.target.className;
}
;
        