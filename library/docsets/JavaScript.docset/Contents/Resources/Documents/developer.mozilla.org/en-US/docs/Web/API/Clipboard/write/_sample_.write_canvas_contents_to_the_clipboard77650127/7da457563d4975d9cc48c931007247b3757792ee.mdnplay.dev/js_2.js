
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Async/await method replacing toBlob() callback
async function getBlobFromCanvas(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Canvas toBlob failed"));
      }
    });
  });
}
const canvas = document.getElementById("canvas");

// Set up canvas
const ctx = canvas.getContext("2d");
ctx.fillStyle = "cornflowerblue";
ctx.fillRect(0, 0, 100, 100);

canvas.addEventListener("click", copyCanvasContentsToClipboard);
const target = document.getElementById("target");

async function copyCanvasContentsToClipboard() {
  // Copy canvas to blob
  try {
    const blob = await getBlobFromCanvas(canvas);
    // Create ClipboardItem with blob and it's type, and add to an array
    const data = [new ClipboardItem({ [blob.type]: blob })];
    // Write the data to the clipboard
    await navigator.clipboard.write(data);
    log("Copied");
  } catch (error) {
    log(error);
  }
}
target.addEventListener("paste", (event) => {
  const items = (event.clipboardData || window.clipboardData).items;
  const blob = items[0].getAsFile();
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    const img = new Image();
    img.src = event.target.result;
    target.appendChild(img);
  });

  reader.readAsDataURL(blob);
});
;
        