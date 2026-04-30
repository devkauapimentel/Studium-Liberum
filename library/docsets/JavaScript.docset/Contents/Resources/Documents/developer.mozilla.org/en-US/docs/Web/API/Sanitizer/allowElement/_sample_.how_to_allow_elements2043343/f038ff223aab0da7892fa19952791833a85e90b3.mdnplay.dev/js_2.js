
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
// Create sanitizer using SanitizerConfig
const sanitizer = new Sanitizer({
  elements: ["div", "script"],
});

// Allow <p> specifying a string
sanitizer.allowElement("p");

// Allow <span> specifying an object
sanitizer.allowElement({ name: "span" });

let sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        