
          const userInput = document.getElementById("userText");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.tooLong) {
    log("Too many characters in the textarea.");
  } else {
    log("Input is valid…");
  }
});
;
        