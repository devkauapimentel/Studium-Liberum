
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().facingMode;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        