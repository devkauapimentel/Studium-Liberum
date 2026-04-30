
          const result = document.getElementById("result");
const supported =
  navigator.mediaDevices.getSupportedConstraints().autoGainControl;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        