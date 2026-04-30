
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const myRules = document.getElementById("css-output").sheet.cssRules;
for (const rule of myRules) {
  if (rule instanceof CSSFontFaceRule) {
    const style = rule.style; // a CSSFontFaceDescriptors
    log(`font-family: ${style.fontFamily}`);
    log(`src: ${style.src}`);
    log(`font-weight: ${style["font-weight"]}`);
    log(`font-style: ${style.fontStyle}`);
    log(`font-display: ${style["font-display"]}`);
  }
}
;
        