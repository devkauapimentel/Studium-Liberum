
          const result = document.getElementById("result");
const supported =
  navigator.mediaDevices.getSupportedConstraints().restrictOwnAudio;
result.textContent = supported ? "Supported!" : "Not supported!";
;
        