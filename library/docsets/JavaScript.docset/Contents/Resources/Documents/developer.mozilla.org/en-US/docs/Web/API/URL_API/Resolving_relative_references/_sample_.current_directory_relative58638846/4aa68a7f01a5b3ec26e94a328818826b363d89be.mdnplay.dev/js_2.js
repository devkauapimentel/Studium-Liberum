
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
log(new URL("./article", "https://test.example.org/api/").href);
// => https://test.example.org/api/article
log(new URL("article", "https://test.example.org/api/v1").href);
// => https://test.example.org/api/article
log(new URL("./story/", "https://test.example.org/api/v2/").href);
// => https://test.example.org/api/v2/story/
log(new URL("./story", "https://test.example.org/api/v2/v3").href);
// => https://test.example.org/api/v2/story
;
        