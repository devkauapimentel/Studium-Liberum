
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
];

const containerElem = document.querySelector(".container");

list.forEach((item) => {
  const innerElem = document.createElement("div");
  innerElem.style.backgroundBlendMode = item;

  const textElem = document.createElement("p");
  textElem.innerText = item;

  const outerElem = document.createElement("div");
  outerElem.appendChild(textElem);
  outerElem.appendChild(innerElem);

  containerElem.appendChild(outerElem);
});
;
        