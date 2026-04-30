
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().deviceId;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        