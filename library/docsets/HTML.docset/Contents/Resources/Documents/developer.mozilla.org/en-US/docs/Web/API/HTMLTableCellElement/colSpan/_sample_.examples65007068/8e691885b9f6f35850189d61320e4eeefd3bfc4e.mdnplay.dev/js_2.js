
          // Obtain relevant interface elements
const cell = document.querySelectorAll("tbody tr td")[0];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  cell.colSpan += 1;

  // Update the display
  output.textContent = cell.colSpan;
});

decreaseButton.addEventListener("click", () => {
  cell.colSpan -= 1;

  // Update the display
  output.textContent = cell.colSpan;
});
;
        