
          // A mock push source.
// Used to simulate some random data arriving
class MockPushSource {
  // total amount of data to stream from the push source
  static #maxData = 90;
  // total data read so far (capped to maxData)
  #dataRead = 0;

  // Method returning promise when this push source is readable.
  dataRequest() {
    const result = {
      bytesRead: 8,
      data: "",
    };

    return new Promise((resolve) => {
      if (this.#dataRead >= MockPushSource.#maxData) {
        // Out of data
        result.bytesRead = 0;
        result.data = "";
        resolve(result);
        return;
      }

      // Emulate slow read of data
      setTimeout(() => {
        const numberBytesReceived = 8;
        this.#dataRead += numberBytesReceived;
        result.data = MockPushSource.#randomChars();
        resolve(result);
      }, 500);
    });
  }

  // Dummy close function
  close() {}

  // Return random character string
  static #randomChars(length = 8) {
    let string = "";
    const choices =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      string += choices[Math.floor(Math.random() * choices.length)];
    }
    return string;
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
const stream = makePushSourceStream();

function makePushSourceStream() {
  const pushSource = new MockPushSource();

  return new ReadableStream({
    start(controller) {
      readRepeatedly().catch((e) => controller.error(e));
      function readRepeatedly() {
        return pushSource.dataRequest().then((result) => {
          if (result.data.length === 0) {
            logSource(`No data from source: closing`);
            controller.close();
            return;
          }

          logSource(`Enqueue data: ${result.data}`);
          controller.enqueue(result.data);
          return readRepeatedly();
        });
      }
    },

    cancel() {
      logSource(`cancel() called on underlying source`);
      pushSource.close();
    },
  });
}
// Monkey patch fetch() so it returns a response that is a mocked stream
window.fetch = async (...args) => ({ body: stream });
let bytes = 0;

const aborter = new AbortController();
button.addEventListener("click", () => aborter.abort());
logChunks("http://example.com/somefile.txt", { signal: aborter.signal });

async function logChunks(url, { signal }) {
  try {
    const response = await fetch(url, signal);
    for await (const chunk of response.body) {
      if (signal.aborted) throw signal.reason;
      bytes += chunk.length;
      logConsumer(`Chunk: ${chunk}. Read ${bytes} characters.`);
    }
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(e);
      logConsumer("TypeError: Browser may not support async iteration");
    } else {
      logConsumer(`Error in async iterator: ${e}.`);
    }
  }
}
;
        