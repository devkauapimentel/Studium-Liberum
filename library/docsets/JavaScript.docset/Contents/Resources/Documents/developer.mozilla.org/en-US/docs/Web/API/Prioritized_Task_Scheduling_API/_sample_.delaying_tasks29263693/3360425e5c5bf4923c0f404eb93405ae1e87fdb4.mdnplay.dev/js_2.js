
          let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
if ("scheduler" in this) {
  // Post task as arrow function with delay of 2 seconds
  scheduler
    .postTask(() => "Task delayed by 2000ms", { delay: 2000 })
    .then((taskResult) => myLog(`${taskResult}`));
  scheduler
    .postTask(() => "Next task should complete in about 2000ms", { delay: 1 })
    .then((taskResult) => myLog(`${taskResult}`));
}
;
        