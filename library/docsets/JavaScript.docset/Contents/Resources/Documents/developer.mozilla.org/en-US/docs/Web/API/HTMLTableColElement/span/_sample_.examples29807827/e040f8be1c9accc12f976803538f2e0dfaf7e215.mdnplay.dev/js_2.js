
          // Obtain relevant interface elements
const col = document.querySelectorAll("col")[1];
const output = document.querySelectorAll("output")[0];

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  col.span += 1;

  // Update the display
  output.textContent = col.span;
});

decreaseButton.addEventListener("click", () => {
  col.span -= 1;

  // Update the display
  output.textContent = col.span;
});
;
        