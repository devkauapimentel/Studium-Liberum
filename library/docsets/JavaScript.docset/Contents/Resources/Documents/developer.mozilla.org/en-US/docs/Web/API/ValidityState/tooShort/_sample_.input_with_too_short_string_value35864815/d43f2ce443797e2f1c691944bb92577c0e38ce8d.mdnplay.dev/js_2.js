
          const userInput = document.getElementById("userText");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.tooShort) {
    log("Not enough characters entered.");
  } else {
    log("Input is valid…");
  }
});
;
        