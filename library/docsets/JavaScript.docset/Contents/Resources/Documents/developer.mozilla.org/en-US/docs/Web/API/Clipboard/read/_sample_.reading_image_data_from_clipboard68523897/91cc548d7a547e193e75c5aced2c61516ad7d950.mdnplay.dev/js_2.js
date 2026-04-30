
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `Error: ${text}`;
}
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
const destinationImage = document.querySelector("#destination");
destinationImage.addEventListener("click", pasteImage);

async function pasteImage() {
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard does not contain PNG image data.");
      }
      const blob = await item.getType("image/png");
      destinationImage.src = URL.createObjectURL(blob);
    }
  } catch (error) {
    log(error.message);
  }
}
;
        