
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");

function openCheck(dialog) {
  log(dialog.open ? "Dialog: open" : "Dialog: closed");
}

openButton.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

dialog.addEventListener("close", () => {
  openCheck(dialog);
});
;
        