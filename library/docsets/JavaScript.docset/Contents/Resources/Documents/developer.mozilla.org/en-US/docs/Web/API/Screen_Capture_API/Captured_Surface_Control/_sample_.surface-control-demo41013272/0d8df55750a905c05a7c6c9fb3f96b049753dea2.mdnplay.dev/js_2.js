
          // Grab references to the <video> element and zoom controls
const videoElem = document.querySelector("video");
const zoomControls = document.getElementById("zoom-controls");

// Grab references to the start and stop capture buttons
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

// Grab references to the zoom out, in, and reset buttons,
// and the zoom level output
const decBtn = document.getElementById("dec");
const outputElem = document.querySelector("output");
const incBtn = document.getElementById("inc");
const resetBtn = document.getElementById("reset");

// Define variables to store the controller and the zoom levels
// in, when we later create them
let controller = undefined;
let zoomLevels = undefined;
zoomControls.style.display = "none";
stopBtn.disabled = true;
startBtn.addEventListener("click", startCapture);
stopBtn.addEventListener("click", stopCapture);
async function startCapture() {
  try {
    // Create a new CaptureController instance
    controller = new CaptureController();

    // Options for getDisplayMedia()
    const displayMediaOptions = {
      controller,
      video: {
        displaySurface: "browser",
      },
    };

    // Capture a tab and display it inside the video element
    videoElem.srcObject =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    // Reset the zoom level when capture starts
    controller.resetZoomLevel();
    outputElem.textContent = `100%`;

    // Get zoom levels for the current captured display surface
    zoomLevels = controller.getSupportedZoomLevels();

    // Report zoom level when it changes
    controller.addEventListener("zoomlevelchange", () => {
      outputElem.textContent = `${controller.zoomLevel}%`;
      updateZoomButtonState();
    });

    zoomControls.style.display = "block";
    stopBtn.disabled = false;
    startBtn.disabled = true;

    // Stop the focus from jumping to the captured tab, if you are self-sharing
    controller.setFocusBehavior("focus-capturing-application");

    // Start forwarding wheel events
    startForwarding();
  } catch (e) {
    console.error(e);
  }
}
function stopCapture() {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  resetApp();
}

function resetApp() {
  videoElem.srcObject = null;
  zoomControls.style.display = "none";
  stopBtn.disabled = true;
  startBtn.disabled = false;
}
decBtn.addEventListener("click", decreaseZoom);
incBtn.addEventListener("click", increaseZoom);
resetBtn.addEventListener("click", resetZoom);

async function decreaseZoom() {
  try {
    await controller.decreaseZoomLevel();
  } catch (e) {
    console.log(e);
  }
}

async function increaseZoom() {
  try {
    await controller.increaseZoomLevel();
  } catch (e) {
    console.log(e);
  }
}

async function resetZoom() {
  await controller.resetZoomLevel();
}
async function startForwarding() {
  try {
    await controller.forwardWheel(videoElem);
  } catch (e) {
    console.log(e);
  }
}
function updateZoomButtonState() {
  decBtn.disabled = false;
  incBtn.disabled = false;
  if (controller.zoomLevel === zoomLevels[0]) {
    decBtn.disabled = true;
  } else if (controller.zoomLevel === zoomLevels[zoomLevels.length - 1]) {
    incBtn.disabled = true;
  }
}
;
        