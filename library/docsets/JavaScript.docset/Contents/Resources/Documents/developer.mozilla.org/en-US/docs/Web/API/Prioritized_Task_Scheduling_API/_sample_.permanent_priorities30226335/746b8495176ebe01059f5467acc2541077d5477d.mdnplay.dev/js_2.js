
          let log = document.getElementById("log");
function myLog(text) {
  log.textContent += `${text}\n`;
}
if ("scheduler" in this) {
  // three tasks, in reverse order of priority
  scheduler.postTask(() => myLog("bkg 1"), { priority: "background" });
  scheduler.postTask(() => myLog("usr-vis 1"), { priority: "user-visible" });
  scheduler.postTask(() => myLog("usr-blk 1"), { priority: "user-blocking" });

  // three more tasks, in reverse order of priority
  scheduler.postTask(() => myLog("bkg 2"), { priority: "background" });
  scheduler.postTask(() => myLog("usr-vis 2"), { priority: "user-visible" });
  scheduler.postTask(() => myLog("usr-blk 2"), { priority: "user-blocking" });

  // Task with default priority: user-visible
  scheduler.postTask(() => myLog("usr-vis 3 (default)"));
}
;
        