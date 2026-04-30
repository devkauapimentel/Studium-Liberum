
          try {
  new HTMLOutputElement();
} catch {
  document.getElementById("warning").hidden = false;
}

const output = new HTMLOutputElement();
output.id = "result";
output.setAttribute("for", "a b");
document.getElementById("output-container").appendChild(output);

function updateResult() {
  const a = document.getElementById("a");
  const b = document.getElementById("b");
  output.value = a.valueAsNumber + b.valueAsNumber;
}

document.getElementById("my-form").addEventListener("input", updateResult);
updateResult();
;
        