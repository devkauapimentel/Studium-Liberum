
          const logElement = document.getElementById("log");
const inputElement = document.getElementById("given-name");

inputElement.addEventListener("keyup", () => {
  logElement.innerText = `Name: ${inputElement.value}`;
});
;
        