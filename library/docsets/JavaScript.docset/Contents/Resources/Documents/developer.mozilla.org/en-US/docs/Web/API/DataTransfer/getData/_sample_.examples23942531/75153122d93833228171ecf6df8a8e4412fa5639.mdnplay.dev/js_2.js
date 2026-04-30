
          const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const dragElement = document.getElementById("drag");

dragElement.addEventListener("dragstart", drag);
div1.addEventListener("dragover", allowDrop);
div2.addEventListener("dragover", allowDrop);
div1.addEventListener("drop", drop);
div2.addEventListener("drop", drop);

function allowDrop(allowDropEvent) {
  allowDropEvent.target.style.color = "blue";
  allowDropEvent.preventDefault();
}

function drag(dragEvent) {
  dragEvent.dataTransfer.setData("text", dragEvent.target.id);
  dragEvent.target.style.color = "green";
}

function drop(dropEvent) {
  dropEvent.preventDefault();
  const data = dropEvent.dataTransfer.getData("text");
  dropEvent.target.appendChild(document.getElementById(data));
  dragElement.style.color = "black";
}
;
        