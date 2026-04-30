
          const log = document.getElementById("log");

// Lock button: Lock the screen to the other orientation (rotated by 90 degrees)
const rotateBtn = document.querySelector("#lock_button");
rotateBtn.addEventListener("click", () => {
  log.textContent += `Lock pressed \n`;

  const oppositeOrientation = screen.orientation.type.startsWith("portrait")
    ? "landscape"
    : "portrait";
  screen.orientation
    .lock(oppositeOrientation)
    .then(() => {
      log.textContent = `Locked to ${oppositeOrientation}\n`;
    })
    .catch((error) => {
      log.textContent += `${error}\n`;
    });
});

// Unlock button: Unlock the screen orientation (if locked)
const unlockBtn = document.querySelector("#unlock_button");
unlockBtn.addEventListener("click", () => {
  log.textContent += "Unlock pressed \n";
  screen.orientation.unlock();
});

// Full screen button: Set the example to fullscreen.
const fullscreenBtn = document.querySelector("#fullscreen_button");
fullscreenBtn.addEventListener("click", () => {
  log.textContent += "Fullscreen pressed \n";
  const container = document.querySelector("#example_container");
  container.requestFullscreen().catch((error) => {
    log.textContent += `${error}\n`;
  });
});
;
        