
          const logElement = document.getElementById("log");
const inputElement = document.getElementById("date");

logElement.innerText = `Initial value: ${inputElement.valueAsNumber}`;

inputElement.addEventListener("change", () => {
  const d = new Date(inputElement.valueAsNumber);
  logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsNumber}, \nwhich is ${d.toDateString()} at ${d.toTimeString()}`;
});
;
        