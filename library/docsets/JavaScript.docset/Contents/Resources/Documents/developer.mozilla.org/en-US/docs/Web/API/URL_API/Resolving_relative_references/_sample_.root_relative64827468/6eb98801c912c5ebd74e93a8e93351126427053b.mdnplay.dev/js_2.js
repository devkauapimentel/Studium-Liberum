
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
log(new URL("/some/path", "https://test.example.org/api/").href);
// => https://test.example.org/some/path
log(new URL("/", "https://test.example.org/api/v1/").href);
// => https://test.example.org/
log(new URL("/article", "https://example.com/api/v1/").href);
// => https://example.com/article
;
        