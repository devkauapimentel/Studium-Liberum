
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const el = document.getElementById("quote");
log(`Initial value: ${el.ariaInvalid}`);
el.ariaInvalid = "grammar";
log(`Updated value: ${el.ariaInvalid}`);
;
        