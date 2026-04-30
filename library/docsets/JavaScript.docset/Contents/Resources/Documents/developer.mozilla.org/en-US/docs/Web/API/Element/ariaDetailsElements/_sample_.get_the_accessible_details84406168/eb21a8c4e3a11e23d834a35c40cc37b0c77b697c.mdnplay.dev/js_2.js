
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const buttonElement = document.querySelector("button");
log(`aria-details: ${buttonElement.getAttribute("aria-details")}`);
// Feature test for ariaDetailsElements
if ("ariaDetailsElements" in Element.prototype) {
  // Get ariaDetailsElements
  const buttonElements = buttonElement.ariaDetailsElements;
  log(`ariaDetailsElements: ${buttonElements}`);

  // Accessible details from ariaDetailsElements
  const text = buttonElements.map((e) => e.textContent.trim()).join(" ");
  log(`Accessible details: ${text.trim()}`);
} else {
  log("element.ariaDetailsElements: not supported by browser");
}
;
        