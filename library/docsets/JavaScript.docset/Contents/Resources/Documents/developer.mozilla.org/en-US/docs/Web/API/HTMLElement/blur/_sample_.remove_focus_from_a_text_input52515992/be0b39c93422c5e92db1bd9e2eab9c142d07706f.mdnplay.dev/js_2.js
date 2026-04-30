
          const textField = document.getElementById("sampleText");
const button = document.querySelector("button");

function focusInput() {
  textField.focus();

  // The input will lose focus after 3 seconds
  setTimeout(() => {
    textField.blur();
  }, 3000);
}

button.addEventListener("click", focusInput);
;
        