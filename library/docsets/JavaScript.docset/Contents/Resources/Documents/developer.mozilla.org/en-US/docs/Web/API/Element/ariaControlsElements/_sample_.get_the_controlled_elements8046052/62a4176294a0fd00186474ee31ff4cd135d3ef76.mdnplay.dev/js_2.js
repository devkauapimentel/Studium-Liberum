
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const toggleButton = document.querySelector("#toggleButton");
const panel1 = document.querySelector("#panel1");
const panel2 = document.querySelector("#panel2");

toggleButton.addEventListener("click", () => {
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

  toggleButton.setAttribute("aria-expanded", !isExpanded);
  panel1.style.display = isExpanded ? "none" : "block";
  panel1.setAttribute("aria-hidden", isExpanded); // true when hidden, false when shown.

  panel2.style.display = isExpanded ? "none" : "block";
  panel2.setAttribute("aria-hidden", isExpanded); // true when hidden, false when shown.
});
log(`aria-controls: ${toggleButton.getAttribute("aria-controls")}`);
// Feature test for ariaControlsElements
if ("ariaControlsElements" in Element.prototype) {
  // Get ariaControlsElements
  const controlledElements = toggleButton.ariaControlsElements;
  log(`ariaControlsElements: ${controlledElements}`);

  // List innerText for each of the ariaControlsElements
  controlledElements.forEach((controlled) => {
    log(` Controlled element text: ${controlled.textContent.trim()}`);
  });
} else {
  log("element.ariaControlsElements: not supported by browser");
}
;
        