
          const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector(".output");

fileInput.addEventListener("change", () => {
  const fileList = fileInput.files;
  output.textContent = `You've selected: ${fileList.length} file(s)`;
});
;
        