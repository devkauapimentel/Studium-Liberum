
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
const base = document.getElementsByTagName("base")[0];
log(`base.href="${base.href}"`);
;
        