
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
// Create sanitizer using SanitizerConfig
const sanitizer = new Sanitizer({
  elements: ["div", "script"],
  replaceWithChildrenElements: ["span"],
});

// Disallow the <p> element
sanitizer.removeElement("p");

// Disallow the <script> element
sanitizer.removeElement("script");
// Disallow the <span> element
sanitizer.removeElement("span");

// Log the sanitizer configuration
let sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        