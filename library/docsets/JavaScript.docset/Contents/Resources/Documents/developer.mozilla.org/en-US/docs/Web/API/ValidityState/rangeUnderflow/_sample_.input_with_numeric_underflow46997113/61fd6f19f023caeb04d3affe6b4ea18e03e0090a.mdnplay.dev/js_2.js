
          const userInput = document.getElementById("age");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

userInput.addEventListener("input", () => {
  userInput.reportValidity();
  if (userInput.validity.rangeUnderflow) {
    log("Number is too low!");
  } else {
    log("Valid…");
  }
});
;
        