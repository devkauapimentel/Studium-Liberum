
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}

function clearLog(text) {
  logElement.innerText = "";
}

const reload = document.querySelector("#reset");

reload.addEventListener("click", () => {
  clearLog();
});
function getPopulatedProperties(elementStyles) {
  for (const prop in elementStyles) {
    if (
      // Check the property belongs to the CSSStyleProperties instance
      // Check property has a numeric index (indicates inline/dash-named style)
      Object.hasOwn(elementStyles, prop) &&
      !Number.isNaN(Number.parseInt(prop, 10))
    ) {
      log(
        `${elementStyles[prop]} = '${elementStyles.getPropertyValue(
          elementStyles[prop],
        )}'`,
      );
    }
  }
}
if (typeof window.CSSStyleProperties === "undefined") {
  log("CSSStyleProperties is not supported on this browser.");
} else {
  const element = document.querySelector("#elt");

  const inlineStyle = document.querySelector("#inline_style");
  inlineStyle.addEventListener("click", () => {
    clearLog();
    const elementStyle = element.style;
    getPopulatedProperties(elementStyle);
  });

  const computedStyle = document.querySelector("#computed_style");
  computedStyle.addEventListener("click", () => {
    clearLog();
    const compStyles = window.getComputedStyle(element);
    getPopulatedProperties(compStyles);
  });
}
;
        