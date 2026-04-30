
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const declineButton = document.getElementById("decline");
const acceptButton = document.getElementById("accept");

openButton.addEventListener("click", () => {
  // Reset the return value on each open
  dialog.returnValue = "";
  updateReturnValue();
  // Show the dialog
  dialog.showModal();
});

function closeDialog(event) {
  const button = event.target;
  dialog.close(button.value);
}

function updateReturnValue() {
  log(`Return value: "${dialog.returnValue}"`);
}

declineButton.addEventListener("click", closeDialog);
acceptButton.addEventListener("click", closeDialog);

dialog.addEventListener("close", updateReturnValue);
;
        