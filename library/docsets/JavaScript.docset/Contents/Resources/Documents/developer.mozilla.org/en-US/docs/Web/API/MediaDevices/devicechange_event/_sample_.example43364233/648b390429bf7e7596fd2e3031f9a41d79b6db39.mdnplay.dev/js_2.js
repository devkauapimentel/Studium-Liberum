
          // UI elements
const videoElement = document.querySelector("#video");
const logElement = document.querySelector("output");
const startButton = document.querySelector("#startButton");

function log(msg) {
  logElement.innerText += `${msg}\n`;
}

startButton.addEventListener("click", () => {
  const constraints = {
    video: {
      width: 160,
      height: 120,
      frameRate: 30,
    },
    audio: {
      sampleRate: 44100,
      sampleSize: 16,
      volume: 0.25,
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      updateDeviceList();
    })
    .catch((err) => {
      log(`${err.name}: ${err.message}`);
    });
});
const audioList = document.getElementById("audioList");
const videoList = document.getElementById("videoList");
function updateDeviceList() {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    audioList.textContent = "";
    videoList.textContent = "";

    devices.forEach((device) => {
      const elem = document.createElement("li");
      const [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

      elem.innerHTML = `<strong>${device.label}</strong> (${direction})`;
      if (type === "audio") {
        audioList.appendChild(elem);
      } else if (type === "video") {
        videoList.appendChild(elem);
      }
    });
  });
}
navigator.mediaDevices.ondevicechange = (event) => {
  updateDeviceList();
};
;
        