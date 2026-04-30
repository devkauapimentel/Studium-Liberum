
          let videoElem = document.getElementById("video");
let playButton = document.getElementById("play-button");

playButton.addEventListener("click", handlePlayButton);
playVideo();

function toggleButton(playing) {
  if (playing) {
    playButton.textContent = "Pause";
    playButton.setAttribute("aria-label", "Pause");
  } else {
    playButton.textContent = "Play";
    playButton.setAttribute("aria-label", "Play");
  }
}

async function playVideo() {
  try {
    await videoElem.play();
    toggleButton(true);
  } catch (err) {
    toggleButton(false);
  }
}

function handlePlayButton() {
  if (videoElem.paused) {
    playVideo();
  } else {
    videoElem.pause();
    toggleButton(false);
  }
}
;
        