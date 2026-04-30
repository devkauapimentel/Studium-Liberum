
          // getElementsByClassName only selects elements that have both given classes
const allOrangeJuiceByClass = document.getElementsByClassName("orange juice");
let result = "document.getElementsByClassName('orange juice')";
for (const el of allOrangeJuiceByClass) {
  result += `\n  ${el.textContent}`;
}

// querySelector only selects full complete matches
const allOrangeJuiceQuery = document.querySelectorAll(".orange.juice");
result += "\n\ndocument.querySelectorAll('.orange.juice')";
for (const el of allOrangeJuiceQuery) {
  result += `\n  ${el.textContent}`;
}

document.getElementById("resultArea").value = result;
;
        