
          document.querySelector("input").addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const caret = document.caretPositionFromPoint?.(x, y);
  if (!caret) {
    log("Not supported");
    return;
  }

  const rect = caret.getClientRect();

  log(`Caret bounding rect: ${JSON.stringify(rect)}`);
  log(`Caret is at (${rect.x.toFixed(2)}, ${rect.y.toFixed(2)})`);
});
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
;
        