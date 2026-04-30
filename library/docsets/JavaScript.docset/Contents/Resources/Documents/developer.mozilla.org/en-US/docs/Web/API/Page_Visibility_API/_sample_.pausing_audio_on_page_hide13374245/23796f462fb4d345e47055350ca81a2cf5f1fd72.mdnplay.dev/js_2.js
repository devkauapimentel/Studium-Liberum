
          const audio = document.querySelector("audio");

let playingOnHide = false;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    playingOnHide = !audio.paused;
    audio.pause();
  } else if (playingOnHide) {
    // Page became visible! Resume playing if audio was "playing on hide"
    audio.play();
  }
});
;
        