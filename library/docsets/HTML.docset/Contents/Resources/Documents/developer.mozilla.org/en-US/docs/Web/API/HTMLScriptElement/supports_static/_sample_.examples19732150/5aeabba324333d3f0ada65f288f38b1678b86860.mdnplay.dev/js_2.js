
          const log = document.getElementById("log");

function checkSupport(type) {
  const result = HTMLScriptElement.supports(type) ? "true" : "false";
  log.textContent += `HTMLScriptElement.supports('${type}') is ${result}\n`;
}

if (typeof HTMLScriptElement.supports === "undefined") {
  log.textContent = "HTMLScriptElement.supports() method is not supported";
} else {
  // Check if various script types are supported
  checkSupport("module");
  checkSupport("classic");
  checkSupport("importmap");
  checkSupport("speculationrules");
  // Any other value will cause the method to return false
  checkSupport("anything else");
}
;
        