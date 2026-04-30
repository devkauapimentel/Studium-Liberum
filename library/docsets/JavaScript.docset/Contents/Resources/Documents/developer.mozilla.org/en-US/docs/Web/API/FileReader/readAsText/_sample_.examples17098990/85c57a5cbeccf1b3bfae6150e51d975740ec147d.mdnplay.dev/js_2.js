
          const content = document.querySelector(".content");
const fileInput = document.querySelector("input[type=file]");

fileInput.addEventListener("change", previewFile);

function previewFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file
    content.innerText = reader.result;
  });

  if (file) {
    reader.readAsText(file);
  }
}
;
        