
          const loadVideo = document.querySelector("button");
const video = document.querySelector("video");
const eventLog = document.querySelector(".event-log-contents");
let source = null;

function handleEvent(event) {
  eventLog.textContent += `${event.type}\n`;
}

video.addEventListener("loadstart", handleEvent);
video.addEventListener("progress", handleEvent);
video.addEventListener("canplay", handleEvent);
video.addEventListener("canplaythrough", handleEvent);

loadVideo.addEventListener("click", () => {
  if (source) {
    document.location.reload();
  } else {
    loadVideo.textContent = "Reset example";
    source = document.createElement("source");
    source.setAttribute(
      "src",
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4",
    );
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
  }
});
;
        