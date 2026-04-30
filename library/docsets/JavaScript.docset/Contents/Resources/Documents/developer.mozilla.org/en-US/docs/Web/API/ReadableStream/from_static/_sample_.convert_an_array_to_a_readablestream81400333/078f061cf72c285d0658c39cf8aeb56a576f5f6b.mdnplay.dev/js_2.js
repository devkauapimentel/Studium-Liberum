
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}

if (!ReadableStream.from) {
  log("ReadableStream.from() is not supported");
}
// An Array of vegetable names
const vegetables = ["Carrot", "Broccoli", "Tomato", "Spinach"];

// Create ReadableStream from the Array
const myReadableStream = ReadableStream.from(vegetables);
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
        