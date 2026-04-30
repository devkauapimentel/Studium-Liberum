
          const audio = document.querySelector("audio");
document.getElementById("rate").addEventListener("change", (e) => {
  audio.playbackRate = e.target.value;
});
document.getElementById("pitch").addEventListener("change", (e) => {
  audio.preservesPitch = e.target.checked;
});
;
        