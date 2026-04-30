
          const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem"),
  fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
});

fileElem.addEventListener("change", handleFiles);

function handleFiles() {
  fileList.textContent = "";
  if (!this.files.length) {
    const p = document.createElement("p");
    p.textContent = "No files selected!";
    fileList.appendChild(p);
  } else {
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (const file of this.files) {
      const li = document.createElement("li");
      list.appendChild(li);

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.height = 60;
      li.appendChild(img);
      const info = document.createElement("span");
      info.textContent = `${file.name}: ${file.size} bytes`;
      li.appendChild(info);
    }
  }
}
;
        