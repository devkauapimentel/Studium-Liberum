
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().channelCount;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        