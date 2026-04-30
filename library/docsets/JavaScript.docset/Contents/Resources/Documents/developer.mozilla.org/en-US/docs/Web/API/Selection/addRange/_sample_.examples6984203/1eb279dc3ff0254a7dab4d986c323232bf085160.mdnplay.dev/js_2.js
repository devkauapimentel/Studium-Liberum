
          let button = document.querySelector("button");

button.addEventListener("click", () => {
  const selection = window.getSelection();
  const strongElems = document.getElementsByTagName("strong");

  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }

  for (const node of strongElems) {
    const range = document.createRange();
    range.selectNode(node);
    selection.addRange(range);
  }
});
;
        