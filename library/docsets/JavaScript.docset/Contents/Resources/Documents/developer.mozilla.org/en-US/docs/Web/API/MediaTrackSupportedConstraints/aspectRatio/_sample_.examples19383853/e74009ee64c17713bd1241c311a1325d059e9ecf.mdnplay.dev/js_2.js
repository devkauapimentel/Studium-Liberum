
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().aspectRatio;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        