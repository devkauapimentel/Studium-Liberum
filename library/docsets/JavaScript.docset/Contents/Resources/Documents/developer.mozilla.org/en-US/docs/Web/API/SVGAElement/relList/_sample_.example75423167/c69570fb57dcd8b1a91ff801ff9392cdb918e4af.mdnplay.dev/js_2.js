
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Select an SVG <a> element
const svgLink = document.querySelector("a");
const relations = svgLink.relList;

relations.forEach((relValue) => {
  log(relValue);
});
;
        