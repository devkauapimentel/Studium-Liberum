
          const audioElement = document.getElementById("audio");
const validButton = document.getElementById("valid-button");
const invalidButton = document.getElementById("invalid-button");
const svgButton = document.getElementById("svg-button");

const logMessage = (logLine) => {
  const now = new Date();
  const timestamp = now.toLocaleTimeString();
  document.getElementById("log").innerText += `\n[${timestamp}] ${logLine}`;
};

validButton.addEventListener("click", () => {
  audioElement.src = "https://mdn.github.io/shared-assets/audio/guitar.mp3";
});

svgButton.addEventListener("click", () => {
  audioElement.src =
    "https://mdn.github.io/shared-assets/images/examples/dino.svg";
});

invalidButton.addEventListener("click", () => {
  audioElement.src = "no-file-here.mp3";
});

audioElement.onerror = () => {
  const err = audioElement.error;
  let userHint = "";

  switch (err.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      userHint = "Canceled audio playback.";
      break;
    case MediaError.MEDIA_ERR_NETWORK:
      userHint = "A network error occurred while fetching the audio.";
      break;
    case MediaError.MEDIA_ERR_DECODE:
      userHint = "An error occurred while decoding the audio.";
      break;
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      userHint = "Audio is missing or is an unsupported format.";
      break;
    default:
      userHint += "An unknown error occurred.";
      break;
  }

  const message = err.message || "no message available";

  logMessage(`Error code ${err.code} (${err.message}), ${userHint}`);
};
;
        