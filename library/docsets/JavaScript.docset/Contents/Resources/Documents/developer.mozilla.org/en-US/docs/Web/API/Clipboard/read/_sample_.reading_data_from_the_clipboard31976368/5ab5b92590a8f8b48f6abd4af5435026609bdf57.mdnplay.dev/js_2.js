
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `Error: ${text}`;
}
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
const destinationDiv = document.querySelector("#destination");
destinationDiv.addEventListener("click", pasteData);

async function pasteData() {
  destinationDiv.innerText = ""; // Clear inner text
  try {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      for (const mimeType of item.types) {
        const mimeTypeElement = document.createElement("p");
        mimeTypeElement.innerText = `MIME type: ${mimeType}`;
        destinationDiv.appendChild(mimeTypeElement);
        if (mimeType === "image/png") {
          const pngImage = new Image();
          pngImage.alt = "PNG image from clipboard";
          const blob = await item.getType("image/png");
          pngImage.src = URL.createObjectURL(blob);
          destinationDiv.appendChild(pngImage);
        } else if (mimeType === "text/html") {
          const blob = await item.getType("text/html");
          const blobText = await blob.text();
          const clipHTML = document.createElement("pre");
          clipHTML.innerText = blobText;
          destinationDiv.appendChild(clipHTML);
        } else if (mimeType === "text/plain") {
          const blob = await item.getType("text/plain");
          const blobText = await blob.text();
          const clipPlain = document.createElement("pre");
          clipPlain.innerText = blobText;
          destinationDiv.appendChild(clipPlain);
        } else {
          throw new Error(`${mimeType} not supported.`);
        }
      }
    }
  } catch (error) {
    log(error.message);
  }
}
;
        