
          const log = document.querySelector("#log");
window.addEventListener("mousemove", logKey);

function logKey(e) {
  log.textContent = `The ctrl key was pressed while the cursor was moving: ${e.ctrlKey}`;
}
;
        