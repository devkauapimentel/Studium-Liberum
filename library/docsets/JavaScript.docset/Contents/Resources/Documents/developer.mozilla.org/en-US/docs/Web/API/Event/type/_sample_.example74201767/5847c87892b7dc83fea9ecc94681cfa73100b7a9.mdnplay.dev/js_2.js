
          function getEventType(event) {
  const log = document.getElementById("log");
  log.innerText = `${event.type}\n${log.innerText}`;
}

// Keyboard events
document.addEventListener("keydown", getEventType); // first
document.addEventListener("keypress", getEventType); // second
document.addEventListener("keyup", getEventType); // third

// Mouse events
document.addEventListener("mousedown", getEventType); // first
document.addEventListener("mouseup", getEventType); // second
document.addEventListener("click", getEventType); // third
;
        