
          function onMouseUp(e) {
  const activeTextarea = document.activeElement;
  const selection = activeTextarea.value.substring(
    activeTextarea.selectionStart,
    activeTextarea.selectionEnd,
  );

  const outputElement = document.getElementById("output-element");
  const outputText = document.getElementById("output-text");
  outputElement.textContent = activeTextarea.id;
  outputText.textContent = selection;
}

const textarea1 = document.getElementById("ta-example-one");
const textarea2 = document.getElementById("ta-example-two");
textarea1.addEventListener("mouseup", onMouseUp);
textarea2.addEventListener("mouseup", onMouseUp);
;
        