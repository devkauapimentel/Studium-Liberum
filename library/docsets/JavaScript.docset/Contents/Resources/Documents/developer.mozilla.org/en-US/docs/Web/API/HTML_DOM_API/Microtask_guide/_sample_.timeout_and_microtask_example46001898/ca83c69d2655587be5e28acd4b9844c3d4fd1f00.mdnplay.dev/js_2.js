
          const logElem = document.getElementById("log");
const log = (s) => (logElem.innerText += `${s}\n`);
const callback = () => log("Regular timeout callback has run");

const urgentCallback = () => log("*** Oh noes! An urgent callback has run!");

log("Main program started");
setTimeout(callback, 0);
queueMicrotask(urgentCallback);
log("Main program exiting");
;
        