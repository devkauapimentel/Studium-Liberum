
          const colorEnd = document.getElementById("color");
const text = document.querySelector("#pin");
const pinBtn = document.querySelector("#pin-btn");
const validPinChecker = /^\d{3}-\d{2}-\d{3}/g;
const selectionEnd = text.value.length;
const selectedText = text.value.substring(text.selectionStart, selectionEnd);

pinBtn.addEventListener("click", () => {
  const correctedText = selectedText.replace(validPinChecker, "");
  text.value = correctedText;
});

// open browser console to verify output
console.log(colorEnd.selectionEnd); // Output : null
;
        