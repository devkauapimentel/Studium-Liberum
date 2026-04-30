
          const result = document.getElementById("result");
const supported = navigator.mediaDevices.getSupportedConstraints().groupId;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        