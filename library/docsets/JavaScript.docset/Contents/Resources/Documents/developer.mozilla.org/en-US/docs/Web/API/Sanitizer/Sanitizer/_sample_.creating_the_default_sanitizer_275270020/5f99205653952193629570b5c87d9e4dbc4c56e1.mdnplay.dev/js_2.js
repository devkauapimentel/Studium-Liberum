
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
// Define unsafe string of HTML
const unsafeHTMLString = `
  <div>
    <p>This is a paragraph. <span onclick="alert('You clicked the span!')">Click me</span></p>
    <script src="path/to/amodule.js" type="module"
  </div>
`;

// Set unsafe string as a text node of first element
const unmodifiedElement = document.querySelector("#unmodified");
unmodifiedElement.innerText = unsafeHTMLString;

// Create sanitizer using a SanitizerConfig that allows script (and other elements)
const sanitizer = new Sanitizer({ elements: ["div", "p", "span", "script"] });

// Use the sanitizer to set the HTML of the second element using the safe method
const setHTMLElement = document.querySelector("#setHTML");
setHTMLElement.setHTML(unsafeHTMLString, { sanitizer });

// Get that HTML and set it back to the element as a text node
// (so we can see the elements)
setHTMLElement.innerText = setHTMLElement.innerHTML;

// Log the configuration
const sanitizerConfig = sanitizer.get();
log(JSON.stringify(sanitizerConfig, null, 2));
} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
}
;
        