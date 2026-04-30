
          const logElem = document.getElementById("log");
const log = (s) => (logElem.innerText += `${s}\n`);
log("Before enqueueing the microtask");
queueMicrotask(() => {
  log("The microtask has run.");
});
log("After enqueueing the microtask");
;
        