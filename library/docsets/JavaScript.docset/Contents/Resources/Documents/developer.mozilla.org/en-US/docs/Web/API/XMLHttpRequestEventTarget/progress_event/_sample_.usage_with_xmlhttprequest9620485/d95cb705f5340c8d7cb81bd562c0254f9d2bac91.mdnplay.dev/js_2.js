
          const xhrButtonSuccess = document.querySelector(".xhr.success");
const xhrButtonError = document.querySelector(".xhr.error");
const xhrButtonAbort = document.querySelector(".xhr.abort");
const log = document.querySelector(".event-log");

function handleEvent(e) {
  log.textContent = `${log.textContent}${e.type}: ${e.loaded} bytes transferred\n`;
}

function addListeners(xhr) {
  xhr.addEventListener("loadstart", handleEvent);
  xhr.addEventListener("load", handleEvent);
  xhr.addEventListener("loadend", handleEvent);
  xhr.addEventListener("progress", handleEvent);
  xhr.addEventListener("error", handleEvent);
  xhr.addEventListener("abort", handleEvent);
}

function runXHR(url) {
  log.textContent = "";

  const xhr = new XMLHttpRequest();
  addListeners(xhr);
  xhr.open("GET", url);
  xhr.send();
  return xhr;
}

xhrButtonSuccess.addEventListener("click", () => {
  runXHR(
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  );
});

xhrButtonError.addEventListener("click", () => {
  runXHR("http://i-dont-exist");
});

xhrButtonAbort.addEventListener("click", () => {
  runXHR(
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  ).abort();
});
;
        