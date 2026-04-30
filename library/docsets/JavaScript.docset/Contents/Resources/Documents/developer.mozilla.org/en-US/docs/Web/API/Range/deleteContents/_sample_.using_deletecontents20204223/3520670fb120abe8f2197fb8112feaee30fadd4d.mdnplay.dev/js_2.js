
          const button = document.getElementById("delete");
const reset = document.getElementById("reset");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const range = document.getSelection().getRangeAt(0);
  range.deleteContents();
});

reset.addEventListener("click", () => {
  window.location.reload();
});
;
        