
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent += text;
}
if ("Sanitizer" in window) {
// Create sanitizer that allows
const sanitizer = new Sanitizer({
  elements: ["p", "script"],
  attributes: ["onwebkitanimationend"],
  replaceWithChildrenElements: ["iframe"],
});

// Make the sanitizer safe!
sanitizer.removeUnsafe();

// Log the sanitizer configuration
const sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        