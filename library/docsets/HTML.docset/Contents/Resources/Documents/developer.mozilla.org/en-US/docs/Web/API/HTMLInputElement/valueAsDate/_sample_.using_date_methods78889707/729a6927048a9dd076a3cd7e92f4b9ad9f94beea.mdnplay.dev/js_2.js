
          const logElement = document.getElementById("log");
const inputElement = document.getElementById("date2");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

logElement.innerText = `Initial value: ${inputElement.valueAsDate}`;

inputElement.addEventListener("change", () => {
  if (inputElement.valueAsDate !== null) {
    logElement.innerText = `You selected ${inputElement.valueAsDate.toLocaleDateString("en-US", options)}`;
  } else {
    logElement.innerText = `${inputElement.value} resolves to ${inputElement.valueAsDate}`;
  }
});
;
        