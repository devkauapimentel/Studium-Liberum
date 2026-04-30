
          const positions = ["start", "center", "end"];
const inlineDirection = document.getElementById("inline");
const blockDirection = document.getElementById("block");
const stop = document.getElementById("stop");
const snap = document.getElementById("snap");
const all = document.querySelector("article");
const rules = document.getElementById("css-output").sheet.cssRules;

setSST();
setSSA();

inlineDirection.addEventListener("change", () => {
  setSSA();
});
blockDirection.addEventListener("change", () => {
  setSSA();
});
stop.addEventListener("change", () => {
  setSST();
});
snap.addEventListener("change", () => {
  all.classList.toggle("snapDisabled");
});

function setSSA() {
  rules[0].style.scrollSnapAlign = `${positions[blockDirection.value]} ${
    positions[inlineDirection.value]
  }`;
}

function setSST() {
  if (stop.checked) {
    rules[0].style.scrollSnapStop = "always";
  } else {
    rules[0].style.scrollSnapStop = "normal";
  }
}
;
        