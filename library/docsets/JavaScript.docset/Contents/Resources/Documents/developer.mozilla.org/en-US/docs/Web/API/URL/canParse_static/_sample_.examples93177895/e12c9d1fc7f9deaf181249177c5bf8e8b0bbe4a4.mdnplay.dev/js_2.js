
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
if ("canParse" in URL) {
  log("Test valid absolute URL");
  let url = "https://developer.mozilla.org/";
  let result = URL.canParse(url);
  log(` URL.canParse("${url}"): ${result}`);

  log("\nTest relative URL with no base URL");
  url = "/en-US/docs";
  result = URL.canParse(url);
  log(` URL.canParse("${url}"): ${result}`);

  log("\nTest relative URL with valid base URL");
  let baseUrl = "https://developer.mozilla.org/";
  result = URL.canParse(url, baseUrl);
  log(` URL.canParse("${url}","${baseUrl}"): ${result}`);
} else {
  log("URL.canParse() not supported");
}
if ("canParse" in URL) {
  log("\nTest relative URL with base URL supplied as a URL object");
  let baseUrl = new URL("https://developer.mozilla.org/");
  let url = "/en-US/docs";
  result = URL.canParse(url, baseUrl);
  log(` URL.canParse("${url}","${baseUrl}"): ${result}`);
}
;
        