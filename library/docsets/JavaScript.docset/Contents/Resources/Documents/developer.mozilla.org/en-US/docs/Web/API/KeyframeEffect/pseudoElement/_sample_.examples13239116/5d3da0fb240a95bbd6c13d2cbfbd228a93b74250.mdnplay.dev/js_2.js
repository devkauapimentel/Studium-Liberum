
          const log = document.getElementById("log");
const text = document.getElementById("text");

// Create the keyframe and launch the animation
const animation = text.animate([{ transform: "rotate(360deg)" }], {
  duration: 3000,
  iterations: Infinity,
  pseudoElement: "::after",
});

// Get the value of KeyframeEffect.pseudoElement
function logPseudoElement() {
  const keyframeEffect = animation.effect;
  log.textContent = `Value of pseudoElement animated: ${keyframeEffect.pseudoElement}`;
  requestAnimationFrame(logPseudoElement);
}

// Every 6 seconds, switch the pseudo-element animated
function switchPseudoElement() {
  const keyframeEffect = animation.effect;
  keyframeEffect.pseudoElement =
    keyframeEffect.pseudoElement === "::after" ? "::before" : "::after";
  setTimeout(switchPseudoElement, 6000);
}

switchPseudoElement();
logPseudoElement();
;
        