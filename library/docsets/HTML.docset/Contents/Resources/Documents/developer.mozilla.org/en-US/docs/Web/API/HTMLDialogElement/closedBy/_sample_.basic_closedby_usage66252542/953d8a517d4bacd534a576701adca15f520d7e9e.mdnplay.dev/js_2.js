
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const dialog = document.querySelector("dialog");
dialog.showModal();
log(`closedBy: ${dialog.closedBy}`);
;
        