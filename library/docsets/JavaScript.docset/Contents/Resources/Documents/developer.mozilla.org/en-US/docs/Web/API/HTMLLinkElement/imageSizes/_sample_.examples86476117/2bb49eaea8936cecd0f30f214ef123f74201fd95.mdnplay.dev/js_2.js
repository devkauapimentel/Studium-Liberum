
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const link = document.querySelector("link");
log(`Original: ${link.imageSizes}`);

// Change the value
link.imageSizes = "50vw";
log(`Updated: ${link.imageSizes}`);
;
        