
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
// Create sanitizer that allows
const sanitizer = new Sanitizer({
  removeAttributes: [],
});

// Remove the title attribute
sanitizer.removeAttribute("title");
// Remove the mathcolor attribute
sanitizer.removeAttribute("mathcolor");

// Log the sanitizer configuration
let sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        