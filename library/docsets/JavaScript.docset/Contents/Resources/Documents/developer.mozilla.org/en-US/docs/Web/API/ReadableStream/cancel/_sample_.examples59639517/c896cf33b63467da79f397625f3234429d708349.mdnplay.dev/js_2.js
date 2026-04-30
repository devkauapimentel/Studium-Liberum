
          const output = document.getElementById("output");

function log(text) {
  output.textContent += `${text}\n`;
}
const searchTerm = "service workers";
// Chars to show either side of the result in the match
const contextBefore = 30;
const contextAfter = 30;
const caseInsensitive = true;
const url = "https://html.spec.whatwg.org/";

log(`Searching '${url}' for '${searchTerm}'`);

fetch(url)
  .then((response) => {
    log("Received headers");

    const decoder = new TextDecoder();
    const reader = response.body.getReader();
    const toMatch = caseInsensitive ? searchTerm.toLowerCase() : searchTerm;
    const bufferSize = Math.max(toMatch.length - 1, contextBefore);

    let bytesReceived = 0;
    let buffer = "";
    let matchFoundAt = -1;

    return reader.read().then(function process(result) {
      if (result.done) {
        log("Failed to find match");
        return;
      }

      bytesReceived += result.value.length;
      log(`Received ${bytesReceived} bytes of data so far`);

      buffer += decoder.decode(result.value, { stream: true });

      // already found match & just context-gathering?
      if (matchFoundAt === -1) {
        matchFoundAt = (
          caseInsensitive ? buffer.toLowerCase() : buffer
        ).indexOf(toMatch);
      }

      if (matchFoundAt === -1) {
        buffer = buffer.slice(-bufferSize);
      } else if (
        buffer.slice(matchFoundAt + toMatch.length).length >= contextAfter
      ) {
        log("Here's the match:");
        log(
          buffer.slice(
            Math.max(0, matchFoundAt - contextBefore),
            matchFoundAt + toMatch.length + contextAfter,
          ),
        );
        log("Cancelling fetch");
        reader.cancel();
        return;
      } else {
        log("Found match, but need more context…");
      }

      // keep reading
      return reader.read().then(process);
    });
  })
  .catch((err) => {
    log(
      "Something went wrong. See devtools for details. Does the response lack CORS headers?",
    );
    throw err;
  });
;
        