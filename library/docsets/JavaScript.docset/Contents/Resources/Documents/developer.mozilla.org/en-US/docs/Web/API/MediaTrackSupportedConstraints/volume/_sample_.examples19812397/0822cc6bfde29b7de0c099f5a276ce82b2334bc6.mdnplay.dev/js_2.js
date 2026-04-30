
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().volume;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        