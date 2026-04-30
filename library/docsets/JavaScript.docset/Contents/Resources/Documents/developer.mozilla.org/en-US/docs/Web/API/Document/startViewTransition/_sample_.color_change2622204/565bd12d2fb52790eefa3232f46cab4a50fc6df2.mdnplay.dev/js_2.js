
          const colors = ["darkred", "darkslateblue", "darkgreen"];
const colBlock = document.querySelector("section");
let count = 0;
const updateColor = () => {
  colBlock.style = `--bg: ${colors[count]}`;
  count = count !== colors.length - 1 ? ++count : 0;
};
const changeColor = () => {
  // Fallback for browsers that don't support View Transitions:
  if (!document.startViewTransition) {
    updateColor();
    return;
  }

  // With View Transitions:
  const transition = document.startViewTransition(() => {
    updateColor();
  });
};
const changeColorButton = document.querySelector("#change-color");
changeColorButton.addEventListener("click", changeColor);
changeColorButton.addEventListener("keypress", changeColor);
;
        