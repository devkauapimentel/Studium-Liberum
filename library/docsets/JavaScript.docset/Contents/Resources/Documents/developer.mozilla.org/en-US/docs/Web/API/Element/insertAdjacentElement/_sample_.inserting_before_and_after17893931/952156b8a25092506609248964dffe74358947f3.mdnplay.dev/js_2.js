
          let selectedElem;

// Function to select a new element
function selectElement(newSelection) {
  if (selectedElem !== newSelection) {
    if (selectedElem) {
      selectedElem.classList.remove("selected");
    }
    selectedElem = newSelection;
    newSelection.classList.add("selected");
  }
}

// Add click handlers that select the clicked element
const initElems = Array.from(document.querySelectorAll("section div"));
for (const initElem of initElems) {
  initElem.addEventListener("click", (e) => selectElement(e.target));
}

// Add click handlers to "beforeBtn" and "afterBtn"
// to insert a new element before/after the selected element
const beforeBtn = document.querySelector(".before");
const afterBtn = document.querySelector(".after");
beforeBtn.addEventListener("click", () => insertNewElement("beforebegin"));
afterBtn.addEventListener("click", () => insertNewElement("afterend"));

function insertNewElement(position) {
  function random() {
    return Math.floor(Math.random() * 255);
  }

  if (!selectedElem) {
    return;
  }

  const newElement = document.createElement("div");
  const randomColor = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  newElement.style.backgroundColor = randomColor;
  newElement.addEventListener("click", (e) => selectElement(e.target));

  selectedElem.insertAdjacentElement(position, newElement);
}

// Reset the example
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => window.location.reload(true));
;
        