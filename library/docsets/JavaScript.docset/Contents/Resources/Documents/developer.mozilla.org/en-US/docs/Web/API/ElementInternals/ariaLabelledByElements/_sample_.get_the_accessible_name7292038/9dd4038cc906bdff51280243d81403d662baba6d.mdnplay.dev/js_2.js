
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Get access to the input within shadowRoot
const hostElement = document.getElementById("host");
const shadowRoot = hostElement.shadowRoot;
const inputElement = shadowRoot.querySelector("input");

// Feature test for ariaLabelledByElements
if ("ariaLabelledByElements" in ElementInternals.prototype) {
  // Get and log attribute that provides the accessible name
  log(`aria-labelledby: ${inputElement.getAttribute("aria-labelledby")}`);

  // Get and log elements that provide the accessible name
  const labelElements = inputElement.ariaLabelledByElements;
  log(`ariaLabelledByElements: ${labelElements}`);

  // Log inner text of elements to get accessible name
  const text = labelElements.map((e) => e.textContent.trim()).join(" ");
  log(`Accessible name: ${text.trim()}`);
} else {
  log("ariaLabelledByElements not supported by browser");
}
;
        