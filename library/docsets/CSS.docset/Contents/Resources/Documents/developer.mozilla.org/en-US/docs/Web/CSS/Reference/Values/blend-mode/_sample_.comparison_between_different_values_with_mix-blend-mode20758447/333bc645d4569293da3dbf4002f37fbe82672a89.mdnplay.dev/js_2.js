
          const list = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
  "plus-darker",
  "plus-lighter",
];

const containerElem = document.querySelector(".container");

list.forEach((item) => {
  const innerElem = document.createElement("div");
  innerElem.innerHTML = `
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  `;

  innerElem.querySelectorAll(".circle").forEach((circle) => {
    circle.style.mixBlendMode = item;
  });

  const textElem = document.createElement("p");
  textElem.innerText = item;

  const outerElem = document.createElement("div");
  outerElem.appendChild(textElem);
  outerElem.appendChild(innerElem);

  containerElem.appendChild(outerElem);
});
;
        