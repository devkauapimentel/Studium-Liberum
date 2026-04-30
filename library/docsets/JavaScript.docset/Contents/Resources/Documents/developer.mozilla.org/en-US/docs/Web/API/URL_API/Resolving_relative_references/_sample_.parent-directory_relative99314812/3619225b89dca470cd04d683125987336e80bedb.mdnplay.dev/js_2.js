
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
log(new URL("../path", "https://test.example.org/api/v1/v2/").href);
// => https://test.example.org/api/v1/path
log(new URL("../../path", "https://test.example.org/api/v1/v2/v3").href);
// => https://test.example.org/api/path
log(new URL("../../../../path", "https://test.example.org/api/v1/v2/").href);
// => https://test.example.org/path
;
        