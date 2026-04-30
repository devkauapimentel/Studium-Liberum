
          class MockHypotheticalSocket {
  constructor() {
    this.max_data = 800; // total amount of data to stream from "socket"
    this.max_per_read = 100; // max data per read
    this.min_per_read = 40; // min data per read
    this.data_read = 0; // total data read so far (capped is maxdata)
    this.socketData = null;
  }

  // Method returning promise when this socket is readable.
  select2() {
    // Object used to resolve promise
    const resultObj = {};
    resultObj["bytesRead"] = 0;

    return new Promise((resolve /*, reject */) => {
      if (this.data_read >= this.max_data) {
        // Out of data
        resolve(resultObj);
        return;
      }

      // Emulate slow read of data
      setTimeout(() => {
        const numberBytesReceived = this.getNumberRandomBytesSocket();
        this.data_read += numberBytesReceived;
        this.socketData = this.randomByteArray(numberBytesReceived);
        resultObj["bytesRead"] = numberBytesReceived;
        resolve(resultObj);
      }, 500);
    });
  }

  /* Read data into specified buffer offset */
  readInto(buffer, offset, length) {
    let dataLength = 0;
    if (this.socketData) {
      dataLength = this.socketData.length;
      const myView = new Uint8Array(buffer, offset, length);
      // Write the length of data specified into buffer
      // Code assumes buffer always bigger than incoming data
      for (let i = 0; i < dataLength; i++) {
        myView[i] = this.socketData[i];
      }
      this.socketData = null; // Clear "socket" data after reading
    }
    return dataLength;
  }

  // Dummy close function
  close() {}

  // Return random number bytes in this call of socket
  getNumberRandomBytesSocket() {
    // Capped to remaining data and the max min return-per-read range
    const remainingData = this.max_data - this.data_read;
    const numberBytesReceived =
      remainingData < this.min_per_read
        ? remainingData
        : this.getRandomIntInclusive(
            this.min_per_read,
            Math.min(this.max_per_read, remainingData),
          );
    return numberBytesReceived;
  }

  // Return random number between two values
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Return random character string
  randomChars(length = 8) {
    let string = "";
    let choices =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      string += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return string;
  }

  /* Return random Uint8Array of bytes */
  randomByteArray(bytes = 8) {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(this.randomChars(bytes));
  }
}
// Store reference to lists, paragraph and button
const list1 = document.querySelector(".input ul");
const list2 = document.querySelector(".output ul");
const button = document.querySelector("button");

// Create empty string in which to store final result
let result = "";

// Function to log data from underlying source
function logSource(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list1.appendChild(listItem);
}

// Function to log data from consumer
function logConsumer(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list2.appendChild(listItem);
}
const stream = makeSocketStream("dummy host", "dummy port");

const DEFAULT_CHUNK_SIZE = 400;

function makeSocketStream(host, port) {
  const socket = new MockHypotheticalSocket();

  return new ReadableStream({
    type: "bytes",

    start(controller) {
      readRepeatedly().catch((e) => controller.error(e));
      function readRepeatedly() {
        return socket.select2().then(() => {
          // Since the socket can become readable even when there's
          // no pending BYOB requests, we need to handle both cases.
          let bytesRead;
          if (controller.byobRequest) {
            const v = controller.byobRequest.view;
            bytesRead = socket.readInto(v.buffer, v.byteOffset, v.byteLength);
            if (bytesRead === 0) {
              controller.close();
            }
            controller.byobRequest.respond(bytesRead);
            logSource(`byobRequest with ${bytesRead} bytes`);
          } else {
            const buffer = new ArrayBuffer(DEFAULT_CHUNK_SIZE);
            bytesRead = socket.readInto(buffer, 0, DEFAULT_CHUNK_SIZE);
            if (bytesRead === 0) {
              controller.close();
            } else {
              controller.enqueue(new Uint8Array(buffer, 0, bytesRead));
            }
            logSource(`enqueue() ${bytesRead} bytes (no byobRequest)`);
          }

          if (bytesRead === 0) {
            return;
            // no more bytes in source
          }
          return readRepeatedly();
        });
      }
    },

    cancel() {
      socket.close();
      logSource(`cancel(): socket closed`);
    },
  });
}
const reader = stream.getReader({ mode: "byob" });
let buffer = new ArrayBuffer(4000);
readStream(reader);

function readStream(reader) {
  let bytesReceived = 0;
  let offset = 0;

  while (offset < buffer.byteLength) {
    // read() returns a promise that resolves when a value has been received
    reader
      .read(new Uint8Array(buffer, offset, buffer.byteLength - offset))
      .then(async function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given all its data.
        // value - some data. Always undefined when done is true.

        if (done) {
          logConsumer(`readStream() complete. Total bytes: ${bytesReceived}`);
          return;
        }

        buffer = value.buffer;
        offset += value.byteLength;
        bytesReceived += value.byteLength;

        // logConsumer(`Read ${bytesReceived} bytes: ${value}`);
        logConsumer(`Read ${bytesReceived} bytes`);
        result += value;

        // Add delay to emulate when data can't be read and data is enqueued
        if (bytesReceived > 300 && bytesReceived < 600) {
          logConsumer(`Delaying read to emulate slow stream reading`);
          const delay = (ms) =>
            new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
          await delay(1000);
        }

        // Read some more, and call this function again
        return reader
          .read(new Uint8Array(buffer, offset, buffer.byteLength - offset))
          .then(processText);
      });
  }
}
button.addEventListener("click", () => {
  reader
    .cancel("user choice")
    .then(() => logConsumer("reader.cancel complete"));
});
reader.closed
  .then(() => {
    logConsumer("ReadableStreamBYOBReader.closed: resolved");
  })
  .catch(() => {
    logConsumer("ReadableStreamBYOBReader.closed: rejected:");
  });
;
        