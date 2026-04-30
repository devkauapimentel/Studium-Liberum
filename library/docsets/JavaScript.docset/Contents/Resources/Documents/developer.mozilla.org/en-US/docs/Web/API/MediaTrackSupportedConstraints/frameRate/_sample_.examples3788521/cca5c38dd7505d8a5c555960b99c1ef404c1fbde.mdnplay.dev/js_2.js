
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().frameRate;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        