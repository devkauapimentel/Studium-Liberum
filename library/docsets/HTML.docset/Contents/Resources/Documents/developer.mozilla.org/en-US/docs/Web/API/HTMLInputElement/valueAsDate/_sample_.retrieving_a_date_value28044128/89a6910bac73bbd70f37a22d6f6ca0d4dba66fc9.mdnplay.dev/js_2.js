
          const logElement = document.getElementById("log");
const inputElement = document.getElementById("date");

logElement.innerText = `Initial value: ${inputElement.valueAsDate}`;

inputElement.addEventListener("change", () => {
  logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsDate}`;
});
;
        