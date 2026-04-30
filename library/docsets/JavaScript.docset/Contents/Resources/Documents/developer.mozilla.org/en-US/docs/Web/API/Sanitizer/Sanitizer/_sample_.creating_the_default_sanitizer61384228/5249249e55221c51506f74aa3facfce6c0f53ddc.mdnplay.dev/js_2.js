
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
// Create default sanitizer
const sanitizer = new Sanitizer();

// Get and log the (default) configuration
const defaultConfig = sanitizer.get();
log(JSON.stringify(defaultConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        