
          const userInput = document.getElementById("degrees");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.stepMismatch) {
    log("Input must be divisible by 5");
  } else {
    log("Input is valid…");
  }
});
;
        