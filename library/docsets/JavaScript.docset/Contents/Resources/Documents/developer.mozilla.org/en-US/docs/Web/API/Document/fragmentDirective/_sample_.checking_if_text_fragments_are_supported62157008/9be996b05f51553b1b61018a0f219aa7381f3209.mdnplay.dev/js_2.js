
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
if (document.fragmentDirective) {
  log("Your browser supports text fragments.");
} else {
  log("Text fragments are not supported in your browser.");
}
;
        