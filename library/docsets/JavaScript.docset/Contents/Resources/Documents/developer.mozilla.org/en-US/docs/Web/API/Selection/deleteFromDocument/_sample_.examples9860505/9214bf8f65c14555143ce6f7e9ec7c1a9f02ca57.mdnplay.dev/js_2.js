
          let button = document.querySelector("button");
button.addEventListener("click", deleteSelection);

function deleteSelection() {
  let selection = window.getSelection();
  selection.deleteFromDocument();
}
;
        