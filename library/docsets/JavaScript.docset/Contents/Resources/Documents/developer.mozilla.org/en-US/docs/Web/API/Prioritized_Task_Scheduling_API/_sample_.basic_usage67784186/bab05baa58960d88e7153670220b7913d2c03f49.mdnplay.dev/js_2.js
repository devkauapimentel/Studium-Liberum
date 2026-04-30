
          let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
// A function that defines a task
function myTask() {
  return "Task 1: user-visible";
}

if ("scheduler" in this) {
  // Post task with default priority: 'user-visible' (no other options)
  // When the task resolves, Promise.then() logs the result.
  scheduler.postTask(myTask).then((taskResult) => myLog(`${taskResult}`));
}
function myTask2() {
  return "Task 2: user-blocking";
}

async function runTask2() {
  const result = await scheduler.postTask(myTask2, {
    priority: "user-blocking",
  });
  myLog(result); // Logs 'Task 2: user-blocking'.
}
runTask2();
// A function that defines a task
function myTask3() {
  myLog("Task 3: user-visible");
}

if ("scheduler" in this) {
  // Post task and log result when it runs
  scheduler.postTask(myTask3);
}
;
        