
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().height;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        