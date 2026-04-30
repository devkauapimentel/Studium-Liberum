
          const elem = document.getElementById("file");

const result = document.getElementById("result");

elem.addEventListener("cancel", () => {
  result.textContent = "Canceled.";
});

elem.addEventListener("change", () => {
  if (elem.files.length === 1) {
    result.textContent = "File Selected.";
  }
});
;
        