
          const inputElement = document.getElementById("statement");
const statementBtn = document.getElementById("statement-btn");
const colorStart = document.getElementById("color");

statementBtn.addEventListener("click", () => {
  inputElement.selectionStart = 4;
  inputElement.selectionEnd = 7;
  inputElement.focus();
});

// open browser console to verify output
console.log(colorStart.selectionStart); // Output : null
;
        