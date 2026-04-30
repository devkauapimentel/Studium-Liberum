
          const draggableElement = document.getElementById("draggable");
const output = document.getElementById("output");
let time = null;
draggableElement.addEventListener("dragstart", (event) => {
  time = Date.now();
  output.textContent = "";
});
draggableElement.addEventListener("drag", (event) => {
  if (time !== null && Date.now() - time > 1000) {
    event.preventDefault();
    output.textContent =
      "Drag operation cancelled; if you are still dragging the node, then your browser does not support cancelling the drag programmatically.";
    time = null;
  }
});
;
        