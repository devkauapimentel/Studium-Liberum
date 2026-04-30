
          const logElement = document.getElementById("log");
function log(text, clear = false) {
  if (clear) {
    logElement.innerText = "";
  }
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");

openButton.addEventListener("click", () => {
  log("open button click event fired", true);
  log("dialog showModal() called");
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  log("close button click event fired");
  log("dialog close() called");
  dialog.close();
});

dialog.addEventListener("close", (event) => {
  log("dialog close event fired");
});
;
        