
          const selectElem = document.querySelector("select");
const divElem = document.querySelector("div");
const slider = document.querySelector("input");
const output = document.querySelector("output");
const curValue = document.querySelector("p code");

selectElem.addEventListener("change", () => {
  setSlider(selectElem.value);
  setDiv(selectElem.value);
});

slider.addEventListener("input", () => {
  setDiv(selectElem.value);
});

function setSlider(filter) {
  switch (filter) {
    case "blur":
      slider.value = 0;
      slider.min = 0;
      slider.max = 30;
      slider.step = 1;
      slider.setAttribute("data-unit", "px");
      break;
    case "brightness":
    case "contrast":
    case "saturate":
      slider.value = 1;
      slider.min = 0;
      slider.max = 4;
      slider.step = 0.05;
      slider.setAttribute("data-unit", "");
      break;
    case "drop-shadow":
      slider.value = 0;
      slider.min = -20;
      slider.max = 40;
      slider.step = 1;
      slider.setAttribute("data-unit", "px");
      break;
    case "opacity":
      slider.value = 1;
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.setAttribute("data-unit", "");
      break;
    case "grayscale":
    case "invert":
    case "sepia":
      slider.value = 0;
      slider.min = 0;
      slider.max = 1;
      slider.step = 0.01;
      slider.setAttribute("data-unit", "");
      break;
    case "hue-rotate":
      slider.value = 0;
      slider.min = 0;
      slider.max = 360;
      slider.step = 1;
      slider.setAttribute("data-unit", "deg");
      break;
    default:
      console.error("Unknown filter set");
  }
}

function setDiv(filter) {
  const unit = slider.getAttribute("data-unit");
  const offset = `${Math.round(slider.value)}${unit}`;
  const radius = `${Math.round(Math.abs(slider.value / 2))}${unit}`;
  divElem.style.filter =
    filter === "drop-shadow"
      ? `${selectElem.value}(${offset} ${offset} ${radius})`
      : `${selectElem.value}(${slider.value}${unit})`;

  updateOutput();
  updateCurValue();
}

function updateOutput() {
  output.textContent = slider.value;
}

function updateCurValue() {
  curValue.textContent = `filter: ${divElem.style.filter}`;
}

setSlider(selectElem.value);
setDiv(selectElem.value);
;
        