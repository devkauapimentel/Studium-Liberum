
          const source = document.getElementById("source");
const target = document.getElementById("target");

source.addEventListener("dragstart", (ev) => {
  console.log("dragStart");
  // Add this element's id to the drag payload so the drop handler will
  // know which element to add to its tree
  const dataList = ev.dataTransfer.items;
  dataList.add(ev.target.id, "text/plain");
  // Add some other items to the drag payload
  dataList.add("<p>Paragraph…</p>", "text/html");
  dataList.add("http://www.example.org", "text/uri-list");
});

source.addEventListener("dragend", (ev) => {
  console.log("dragEnd");
  const dataList = ev.dataTransfer.items;
  // Clear any remaining drag data
  dataList.clear();
});

target.addEventListener("drop", (ev) => {
  console.log("Drop");
  ev.preventDefault();
  const data = ev.dataTransfer.items;
  // Loop through the dropped items and log their data
  for (let i = 0; i < data.length; i++) {
    if (data[i].kind === "string" && data[i].type.match("^text/plain")) {
      // This item is the target node
      data[i].getAsString((s) => {
        ev.target.appendChild(document.getElementById(s));
      });
    } else if (data[i].kind === "string" && data[i].type.match("^text/html")) {
      // Drag data item is HTML
      data[i].getAsString((s) => {
        console.log(`… Drop: HTML = ${s}`);
      });
    } else if (
      data[i].kind === "string" &&
      data[i].type.match("^text/uri-list")
    ) {
      // Drag data item is URI
      data[i].getAsString((s) => {
        console.log(`… Drop: URI = ${s}`);
      });
    }
  }
});

target.addEventListener("dragover", (ev) => {
  console.log("dragOver");
  ev.preventDefault();
  // Set the dropEffect to move
  ev.dataTransfer.dropEffect = "move";
});
;
        