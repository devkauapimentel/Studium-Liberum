
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().sampleSize;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        