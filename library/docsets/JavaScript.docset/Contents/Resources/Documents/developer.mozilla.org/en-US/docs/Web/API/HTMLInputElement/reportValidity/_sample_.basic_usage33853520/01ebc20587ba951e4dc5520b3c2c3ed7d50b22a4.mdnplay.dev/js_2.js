
          const output = document.querySelector("#log");
const reportButton = document.querySelector("#report");
const ageInput = document.querySelector("#age");

ageInput.addEventListener("invalid", () => {
  console.log("Invalid event fired.");
});

reportButton.addEventListener("click", () => {
  const reportVal = ageInput.reportValidity();
  output.innerHTML = `"reportValidity()" returned: ${reportVal}`;
  if (!reportVal) {
    output.innerHTML += `<br />Validation message: "${ageInput.validationMessage}"`;
  }
});
;
        