
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().sampleRate;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        