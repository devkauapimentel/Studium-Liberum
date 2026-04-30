
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.textContent = text;
}
if ("Sanitizer" in window) {
  // Define unsafe string of HTML
  const initialHTMLString =
    `<div id="mainDiv"><!-- HTML comment -->
    <p data-test="true">This is a paragraph. <button onclick="alert('You clicked the button!')">Click me</button></p>
    <p>Be <b>bold</b> and brave!</p>
    <script>alert(1)<` + "/script></div>";

  // Set unsafe string as a text node of first element
  const unmodifiedElement = document.querySelector("#unmodified");
  unmodifiedElement.innerText = initialHTMLString;
  unsafeHTMLString = unmodifiedElement.innerText;

  const setHTMLElement = document.querySelector("#setHTML");
  const setHTMLUnsafeElement = document.querySelector("#setHTMLUnsafe");
  // Create and apply default sanitizer when we start
  let sanitizer = new Sanitizer({});
  applySanitizer(sanitizer);
function applySanitizer(sanitizer) {
  // Get string to parse into element
  unsafeHTMLString = unmodifiedElement.innerText;

  // Sanitize string using safe method and then display as text
  setHTMLElement.setHTML(unsafeHTMLString, { sanitizer });
  setHTMLElement.innerText = setHTMLElement.innerHTML;

  // Sanitize string using unsafe method and then display as text
  setHTMLUnsafeElement.setHTMLUnsafe(unsafeHTMLString, { sanitizer });
  setHTMLUnsafeElement.innerText = setHTMLUnsafeElement.innerHTML;

  // Display sanitizer configuration
  const sanitizerConfig = sanitizer.get();
  log(JSON.stringify(sanitizerConfig, null, 2));
}
const defaultSanitizerBtn = document.querySelector("#defaultSanitizerBtn");
const emptySanitizerBtn = document.querySelector("#emptySanitizerBtn");
const allowElementSelect = document.querySelector("#allowElementSelect");
const removeElementSelect = document.querySelector("#removeElementSelect");
const allowAttributeSelect = document.querySelector("#allowAttributeSelect");
const removeAttributeSelect = document.querySelector("#removeAttributeSelect");

const toggleCommentsBtn = document.querySelector("#toggleCommentsBtn");
const toggleDataAttributesBtn = document.querySelector(
  "#toggleDataAttributesBtn",
);
defaultSanitizerBtn.addEventListener("click", () => {
  sanitizer = new Sanitizer();
  applySanitizer(sanitizer);
});

emptySanitizerBtn.addEventListener("click", () => {
  sanitizer = new Sanitizer({});
  applySanitizer(sanitizer);
});
allowElementSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.allowElement(event.target.value);
    applySanitizer(sanitizer);
  }
});
removeElementSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.removeElement(event.target.value);
    applySanitizer(sanitizer);
  }
});
allowAttributeSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.allowAttribute(event.target.value);
    applySanitizer(sanitizer);
  }
});
removeAttributeSelect.addEventListener("change", (event) => {
  if (event.target.value !== "") {
    sanitizer.removeAttribute(event.target.value);
    applySanitizer(sanitizer);
  }
});
let dataAttributesActive = true;
let commentsActive = true;

toggleCommentsBtn.addEventListener("click", () => {
  commentsActive = !commentsActive;
  sanitizer.setComments(commentsActive);
  applySanitizer(sanitizer);
});

toggleDataAttributesBtn.addEventListener("click", () => {
  dataAttributesActive = !dataAttributesActive;
  sanitizer.setDataAttributes(dataAttributesActive);
  applySanitizer(sanitizer);
});


} else {
  log("The HTML Sanitizer API is NOT supported in this browser.");
  // Provide fallback or alternative behavior
}
;
        