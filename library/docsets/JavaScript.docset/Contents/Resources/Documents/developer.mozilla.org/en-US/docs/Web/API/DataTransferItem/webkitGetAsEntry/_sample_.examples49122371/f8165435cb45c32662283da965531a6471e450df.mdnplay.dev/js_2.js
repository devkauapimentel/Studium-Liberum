
          let dropzone = document.getElementById("dropzone");
let listing = document.getElementById("listing");

function scanFiles(item, container) {
  let elem = document.createElement("li");
  elem.textContent = item.name;
  container.appendChild(elem);

  if (item.isDirectory) {
    let directoryReader = item.createReader();
    let directoryContainer = document.createElement("ul");
    container.appendChild(directoryContainer);
    directoryReader.readEntries((entries) => {
      entries.forEach((entry) => {
        scanFiles(entry, directoryContainer);
      });
    });
  }
}
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
dropzone.addEventListener("drop", (event) => {
  let items = event.dataTransfer.items;

  event.preventDefault();
  listing.textContent = "";

  for (const item of items) {
    const entry = item.webkitGetAsEntry();

    if (entry) {
      scanFiles(entry, listing);
    }
  }
});
;
        