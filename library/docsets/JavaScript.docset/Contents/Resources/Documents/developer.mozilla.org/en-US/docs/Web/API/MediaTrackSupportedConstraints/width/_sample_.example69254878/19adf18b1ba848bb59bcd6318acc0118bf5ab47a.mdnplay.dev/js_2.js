
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().width;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        