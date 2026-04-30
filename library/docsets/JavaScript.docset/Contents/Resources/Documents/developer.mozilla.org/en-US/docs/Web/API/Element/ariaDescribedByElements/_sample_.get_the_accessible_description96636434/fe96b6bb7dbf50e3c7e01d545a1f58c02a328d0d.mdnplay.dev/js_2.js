
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const buttonElement = document.querySelector("button");
log(`aria-describedby: ${buttonElement.getAttribute("aria-describedby")}`);
// Feature test for ariaDescribedByElements
if ("ariaDescribedByElements" in Element.prototype) {
  // Get ariaDescribedByElements
  const buttonElements = buttonElement.ariaDescribedByElements;
  log(`ariaDescribedByElements: ${buttonElements}`);

  // Accessible description from the elements
  const text = buttonElements.map((e) => e.textContent.trim()).join(" ");
  log(`Accessible description: ${text.trim()}`);
} else {
  log("element.ariaDescribedByElements: not supported by browser");
}
;
        