
          const log = document.getElementById("reportResult");
const video = document.getElementById("bunny_vid");

if (!navigator.getAutoplayPolicy) {
  log.textContent =
    "navigator.getAutoplayPolicy() not supported. It may or may not autoplay, depending on the browser!";
} else {
  // Here we pass in the HTMLVideoElement to check
  log.textContent = `navigator.getAutoplayPolicy(video) === ${navigator.getAutoplayPolicy(
    "mediaelement",
  )}`;

  if (navigator.getAutoplayPolicy(video) === "allowed-muted") {
    // Mute the video so it can autoplay
    video.muted = true;
    log.textContent += "Video has been muted to allow it to autoplay.";
  }
}
;
        