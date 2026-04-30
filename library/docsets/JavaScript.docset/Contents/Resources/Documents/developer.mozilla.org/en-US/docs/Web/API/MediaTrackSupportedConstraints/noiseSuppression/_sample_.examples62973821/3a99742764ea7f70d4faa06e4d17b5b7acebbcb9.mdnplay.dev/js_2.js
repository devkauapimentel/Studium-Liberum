
          const result = document.getElementById("result");
const supported =
  navigator.mediaDevices.getSupportedConstraints().noiseSuppression;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        