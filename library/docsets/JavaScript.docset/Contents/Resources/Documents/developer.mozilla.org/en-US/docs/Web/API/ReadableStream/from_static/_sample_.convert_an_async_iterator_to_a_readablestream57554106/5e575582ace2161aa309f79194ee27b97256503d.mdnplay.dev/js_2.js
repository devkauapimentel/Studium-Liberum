
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
if (!ReadableStream.from) {
  log("ReadableStream.from() is not supported");
}
// Define an asynchronous iterator
const asyncIterator = (async function* () {
  yield 1;
  yield 2;
  yield 3;
})();

// Create ReadableStream from iterator
const myReadableStream = ReadableStream.from(asyncIterator);
consumeStream(myReadableStream);

// Iterate a ReadableStream asynchronously
async function consumeStream(readableStream) {
  for await (const chunk of readableStream) {
    // Do something with each chunk
    // Here we just log the values
    log(`chunk: ${chunk}`);
  }
}
;
        