
          class MockUnderlyingFileHandle {
  constructor() {
    this.maxdata = 100; // "file size"
    this.maxReadChunk = 25; // "max read chunk size"
    this.minReadChunk = 13; // "min read chunk size"
    this.filedata = this.randomByteArray(this.maxdata);
    this.position = 0;
  }

  // Read data from "file" at position/length into specified buffer offset
  read(buffer, offset, length, position) {
    // Object used to resolve promise
    const resultObj = {};
    resultObj["buffer"] = buffer;
    resultObj["bytesRead"] = 0;

    return new Promise((resolve /*, reject */) => {
      if (position >= this.maxdata) {
        // Out of data
        resolve(resultObj);
        return;
      }

      // Simulate a file read that returns random numbers of bytes
      // Read minimum of bytes requested and random bytes that can be returned
      let readLength =
        Math.floor(
          Math.random() * (this.maxReadChunk - this.minReadChunk + 1),
        ) + this.minReadChunk;
      readLength = length > readLength ? readLength : length;

      // Read random data into supplied buffer
      const myView = new Uint8Array(buffer, offset, readLength);
      // Write the length of data specified
      for (let i = 0; i < readLength; i++) {
        myView[i] = this.filedata[position + i];
        resultObj["bytesRead"] = i + 1;
        if (position + i + 1 >= this.maxdata) {
          break;
        }
      }
      // Emulate slow read of data
      setTimeout(() => {
        resolve(resultObj);
      }, 1000);
    });
  }

  // Dummy close function
  close() {}

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

  // Return random Uint8Array of bytes
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
const stream = makeReadableByteFileStream("dummy file.txt");
const DEFAULT_CHUNK_SIZE = 40;

function makeReadableByteFileStream(filename) {
  let fileHandle;
  let position = 0;
  return new ReadableStream({
    type: "bytes", // An underlying byte stream!
    start(controller) {
      // Called to initialize the underlying source.
      // For a file source open a file handle (here we just create the mocked object).
      fileHandle = new MockUnderlyingFileHandle();
      logSource(
        `start(): ${controller.constructor.name}.byobRequest = ${controller.byobRequest}`,
      );
    },
    async pull(controller) {
      // Called when there is a pull request for data
      if (controller.byobRequest) {
        const theView = controller.byobRequest.view;
        const { bytesRead, buffer } = await fileHandle.read(
          theView.buffer,
          theView.byteOffset,
          theView.byteLength,
          position,
        );
        if (bytesRead === 0) {
          await fileHandle.close();
          controller.close();
          controller.byobRequest.respond(0);
          logSource(
            `pull() with byobRequest. Close controller (read bytes: ${bytesRead})`,
          );
        } else {
          position += bytesRead;
          controller.byobRequest.respond(bytesRead);
          logSource(`pull() with byobRequest. Transfer ${bytesRead} bytes`);
        }
      } else {
        // No BYOBRequest so enqueue data to stream
        // NOTE, this branch would only execute for a default reader if autoAllocateChunkSize is not defined.
        const myNewBuffer = new Uint8Array(DEFAULT_CHUNK_SIZE);
        const { bytesRead, buffer } = await fileHandle.read(
          myNewBuffer.buffer,
          myNewBuffer.byteOffset,
          myNewBuffer.byteLength,
          position,
        );
        if (bytesRead === 0) {
          await fileHandle.close();
          controller.close();
          controller.enqueue(myNewBuffer);
          logSource(
            `pull() with no byobRequest. Close controller (read bytes: ${bytesRead})`,
          );
        } else {
          position += bytesRead;
          controller.enqueue(myNewBuffer);
          logSource(`pull() with no byobRequest. enqueue() ${bytesRead} bytes`);
        }
      }
    },
    cancel(reason) {
      // This is called if the stream is cancelled (via reader or controller).
      // Clean up any resources
      fileHandle.close();
      logSource(`cancel() with reason: ${reason}`);
    },
  });
}
const reader = stream.getReader();

readStream(reader);

function readStream(reader) {
  let bytesReceived = 0;
  let result = "";

  // read() returns a promise that resolves
  // when a value has been received
  reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      logConsumer(`readStream() complete. Total bytes: ${bytesReceived}`);
      return;
    }

    bytesReceived += value.length;
    logConsumer(`Read ${bytesReceived} bytes so far. Current bytes = ${value}`);
    result += value;

    // Read some more, and call this function again
    return reader.read().then(processText);
  });
}
button.addEventListener("click", () => {
  reader.cancel("user choice").then(() => {
    logConsumer(`reader.cancel complete`);
  });
});
;
        