
          const logElement = document.querySelector("#log");

function log(text) {
  logElement.innerText = text;
}
const input = document.getElementById("text-box");

if ("direction" in Selection.prototype) {
  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    log(`Selection direction: ${selection.direction}`);
  });
} else {
  log("direction property not defined");
  input.hidden = true;
}
;
        