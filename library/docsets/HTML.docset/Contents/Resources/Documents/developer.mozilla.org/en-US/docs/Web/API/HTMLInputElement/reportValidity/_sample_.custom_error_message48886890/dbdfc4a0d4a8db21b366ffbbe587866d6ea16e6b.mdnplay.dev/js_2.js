
          const output = document.querySelector("#log");
const reportButton = document.querySelector("#report");
const ageInput = document.querySelector("#age");
const fixButton = document.querySelector("#fix");
let enableValidation = false;

fixButton.addEventListener("click", (e) => {
  enableValidation = true;
  fixButton.innerHTML = "Error fixed";
  fixButton.disabled = true;
});

reportButton.addEventListener("click", () => {
  validateAge();
  const reportVal = ageInput.reportValidity();
  output.innerHTML = `"reportValidity()" returned: ${reportVal}`;
  if (!reportVal) {
    output.innerHTML += `<br />Validation message: "${ageInput.validationMessage}"`;
  }
});

function validateAge() {
  const validityState = ageInput.validity;
  if (validityState.valueMissing) {
    ageInput.setCustomValidity("Please set an age (required)");
  } else if (validityState.rangeUnderflow) {
    ageInput.setCustomValidity("Your value is too low");
  } else if (validityState.rangeOverflow) {
    ageInput.setCustomValidity("Your value is too high");
  } else if (enableValidation) {
    // sets to empty string if valid AND enableValidation has been set to true
    ageInput.setCustomValidity("");
  }
}
;
        