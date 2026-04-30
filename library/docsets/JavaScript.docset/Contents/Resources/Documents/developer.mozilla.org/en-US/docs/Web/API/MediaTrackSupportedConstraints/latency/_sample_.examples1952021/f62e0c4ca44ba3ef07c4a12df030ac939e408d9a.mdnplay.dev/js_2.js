
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().latency;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        