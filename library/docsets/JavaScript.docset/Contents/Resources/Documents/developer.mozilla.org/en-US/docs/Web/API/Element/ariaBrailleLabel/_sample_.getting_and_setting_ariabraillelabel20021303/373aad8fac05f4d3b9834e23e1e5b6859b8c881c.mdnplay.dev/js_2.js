
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const button = document.getElementById("button");
log(button.ariaBrailleLabel);
button.ariaBrailleLabel = "3*";
log(button.ariaBrailleLabel);
;
        