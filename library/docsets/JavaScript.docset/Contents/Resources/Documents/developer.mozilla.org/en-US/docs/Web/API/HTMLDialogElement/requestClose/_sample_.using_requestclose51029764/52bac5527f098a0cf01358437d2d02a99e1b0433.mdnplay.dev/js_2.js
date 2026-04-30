
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");
const closeWithValueButton = document.getElementById("close-w-value");
const preventCloseInput = document.getElementById("prevent-close");

// Open button opens a modal dialog
openButton.addEventListener("click", () => {
  // Reset the return value
  dialog.returnValue = "";
  // Show the dialog
  dialog.showModal();
});

// Close button closes the dialog box
closeButton.addEventListener("click", () => {
  dialog.requestClose();
});

// Close button closes the dialog box with a return value
closeWithValueButton.addEventListener("click", () => {
  dialog.requestClose("some value");
});

// Fired when requestClose() is called
// Prevent the dialog from closing by calling event.preventDefault()
dialog.addEventListener("cancel", (event) => {
  if (preventCloseInput.checked) {
    log("Dialog close cancelled");
    event.preventDefault();
  }
});

// cancel event is not prevented, dialog will close
dialog.addEventListener("close", () => {
  log(`Dialog closed. Return value: "${dialog.returnValue}"`);
});
;
        