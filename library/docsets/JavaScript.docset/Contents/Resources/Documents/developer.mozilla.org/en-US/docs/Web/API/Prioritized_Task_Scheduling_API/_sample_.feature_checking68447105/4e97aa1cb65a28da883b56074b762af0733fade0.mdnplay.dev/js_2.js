
          // hidden logger code - simplifies example
let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
// Check that feature is supported
if ("scheduler" in globalThis) {
  myLog("Feature: Supported");
} else {
  myLog("Feature: NOT Supported");
}
;
        