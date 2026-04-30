
          const log = document.getElementById("log");

// The selection object is a singleton associated with the document
const selection = document.getSelection();

// Logs if there is a selection or not
function newSelectionHandler() {
  if (selection.rangeCount !== 0) {
    log.textContent = "Some text is selected.";
  } else {
    log.textContent = "No selection on this document.";
  }
}

document.addEventListener("selectionchange", () => {
  newSelectionHandler();
});

newSelectionHandler();

// The button cancel all selection ranges
const button = document.querySelector("button");
button.addEventListener("click", () => {
  selection.empty();
});
;
        