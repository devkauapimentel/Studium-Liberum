
          const logs = document.getElementById("logs");
const operand1 = document.getElementById("operand1");
const operand2 = document.getElementById("operand2");
const result = document.getElementById("result");

function updateResult() {
  result.value = operand1.valueAsNumber + operand2.valueAsNumber;
  logs.innerText = `result.defaultValue: ${result.defaultValue}\nresult.value: ${result.value}`;
}

operand1.addEventListener("input", updateResult);
operand2.addEventListener("input", updateResult);
updateResult();
;
        