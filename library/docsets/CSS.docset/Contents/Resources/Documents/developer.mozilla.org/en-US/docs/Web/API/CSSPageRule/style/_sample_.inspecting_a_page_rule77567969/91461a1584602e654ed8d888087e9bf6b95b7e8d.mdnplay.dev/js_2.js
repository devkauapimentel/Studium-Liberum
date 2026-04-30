
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const myRules = document.getElementById("css-output").sheet.cssRules;
for (const rule of myRules) {
  if (rule instanceof CSSPageRule) {
    log(`${rule.style}`);
    log(`margin: ${rule.style.margin}`);

    // Access properties using CamelCase properties
    log(`marginTop: ${rule.style.marginTop}`);
    log(`marginRight: ${rule.style.marginRight}`);
    log(`marginBottom: ${rule.style.marginBottom}`);
    log(`marginLeft: ${rule.style.marginLeft}`);
    log(`pageOrientation: ${rule.style.pageOrientation}`);

    // Access properties using snake-case properties
    log(`margin-top: ${rule.style["margin-top"]}`);
    log(`margin-right: ${rule.style["margin-right"]}`);
    log(`margin-left: ${rule.style["margin-left"]}`);
    log(`margin-bottom: ${rule.style["margin-bottom"]}`);
    log(`page-orientation: ${rule.style["page-orientation"]}`);

    log(`size: ${rule.style.size}`);
    log("\n");
  }
}
;
        