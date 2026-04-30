
          // Obtain relevant interface elements
const row = document.querySelectorAll("tbody tr")[1];
const cell = row.cells[0];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  cell.rowSpan += 1;

  // Update the display
  output.textContent = cell.rowSpan;
});

decreaseButton.addEventListener("click", () => {
  cell.rowSpan -= 1;

  // Update the display
  output.textContent = `${cell.rowSpan === 0 ? "all remaining" : cell.rowSpan}`;
});
;
        