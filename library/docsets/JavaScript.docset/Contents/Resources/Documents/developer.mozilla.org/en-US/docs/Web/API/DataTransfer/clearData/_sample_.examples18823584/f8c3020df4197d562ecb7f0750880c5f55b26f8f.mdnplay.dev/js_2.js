
          // Select HTML elements
const draggable = document.getElementById("source");
const droppable = document.getElementById("target");
const status = document.getElementById("status");
const data = document.getElementById("data");
let dropped = false;

// Register event handlers
draggable.addEventListener("dragstart", dragStartHandler);
draggable.addEventListener("dragend", dragEndHandler);
droppable.addEventListener("dragover", dragOverHandler);
droppable.addEventListener("dragleave", dragLeaveHandler);
droppable.addEventListener("drop", dropHandler);

function dragStartHandler(event) {
  status.textContent = "Drag in process";

  // Change target element's border to signify drag has started
  event.currentTarget.style.border = "1px dashed blue";

  // Start by clearing existing clipboards; this will affect all types since we
  // don't give a specific type.

  event.dataTransfer.clearData();

  // Set the drag's format and data (use event target's id for data)
  event.dataTransfer.setData("text/plain", event.target.id);

  data.textContent = event.dataTransfer.getData("text/plain");
}

function dragEndHandler(event) {
  if (!dropped) {
    status.textContent = "Drag canceled";
  }

  data.textContent = event.dataTransfer.getData("text/plain") || "empty";

  // Change border to signify drag is no longer in process
  event.currentTarget.style.border = "1px solid black";

  if (dropped) {
    // Remove all event listeners
    draggable.removeEventListener("dragstart", dragStartHandler);
    draggable.removeEventListener("dragend", dragEndHandler);
    droppable.removeEventListener("dragover", dragOverHandler);
    droppable.removeEventListener("dragleave", dragLeaveHandler);
    droppable.removeEventListener("drop", dropHandler);
  }
}

function dragOverHandler(event) {
  status.textContent = "Drop available";

  event.preventDefault();
}

function dragLeaveHandler(event) {
  status.textContent = "Drag in process (drop was available)";

  event.preventDefault();
}

function dropHandler(event) {
  dropped = true;

  status.textContent = "Drop done";

  event.preventDefault();

  // Get data linked to event format « text »
  const _data = event.dataTransfer.getData("text/plain");
  const element = document.getElementById(_data);

  // Append drag source element to event's target element
  event.target.appendChild(element);

  // Change CSS styles and displayed text
  element.style.cssText = "border: 1px solid black;display: block; color: red";
  element.textContent = "I'm in the Drop Zone!";
}
;
        