
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
if ("parse" in URL) {
  // Absolute URL
  let result = URL.parse("https://developer.mozilla.org/en-US/docs");
  log(`[1]: ${result.href}`);

  // Relative reference to a valid base URL
  result = URL.parse("en-US/docs", "https://developer.mozilla.org");
  log(`[2]: ${result.href}`);

  // Relative reference to a "complicated" valid base URL
  // (only the scheme and domain are used to resolve url)
  result = URL.parse(
    "/different/place",
    "https://developer.mozilla.org:443/some/path?id=4",
  );
  log(`[3]: ${result.href}`);

  // Absolute url argument (base URL ignored)
  result = URL.parse(
    "https://example.org/some/docs",
    "https://developer.mozilla.org",
  );
  log(`[4]: ${result.href}`);

  // Invalid base URL (missing colon)
  result = URL.parse("en-US/docs", "https//developer.mozilla.org");
  log(`[5]: ${result}`);
} else {
  log("URL.parse() not supported");
}
if ("parse" in URL) {
  // Relative reference with base URL supplied as a URL object
  result = URL.parse("/en-US/docs", new URL("https://developer.mozilla.org/"));
  log(`[6]: ${result.href}`);
}
;
        