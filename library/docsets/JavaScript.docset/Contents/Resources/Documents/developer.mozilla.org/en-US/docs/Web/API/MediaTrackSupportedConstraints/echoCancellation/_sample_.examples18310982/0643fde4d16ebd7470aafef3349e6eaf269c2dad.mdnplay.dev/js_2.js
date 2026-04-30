
          const result = document.getElementById("result");
const supported =
  navigator.mediaDevices.getSupportedConstraints().echoCancellation;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        