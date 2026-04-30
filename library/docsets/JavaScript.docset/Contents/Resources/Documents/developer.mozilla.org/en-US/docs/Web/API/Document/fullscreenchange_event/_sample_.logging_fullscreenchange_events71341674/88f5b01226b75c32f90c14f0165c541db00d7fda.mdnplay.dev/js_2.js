
          const logger = document.querySelector("#logger");
const fullScreenElement = document.querySelector("#fullscreen-div");

function log(message) {
  logger.textContent = `${logger.textContent}\n${message}`;
}

function fullscreenchangeHandler(event) {
  // document.fullscreenElement will point to the element that
  // is in fullscreen mode if there is one. If there isn't one,
  // the value of the property is null.
  if (document.fullscreenElement) {
    log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
  } else {
    log("Leaving fullscreen mode.");
  }
}

document.addEventListener("fullscreenchange", fullscreenchangeHandler);

// When the toggle button is clicked, enter/exit fullscreen
document.getElementById("toggle-fullscreen").addEventListener("click", () => {
  if (document.fullscreenElement) {
    // exitFullscreen is only available on the Document object.
    document.exitFullscreen();
  } else {
    fullScreenElement.requestFullscreen();
  }
});
;
        