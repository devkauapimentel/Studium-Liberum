
          const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector(".output");

fileInput.addEventListener("change", () => {
  const fileList = fileInput.files;
  if (fileList.length > 0) {
    const file = fileList.item(0);
    output.textContent = `You selected: ${file.name}`;
  }
});
;
        