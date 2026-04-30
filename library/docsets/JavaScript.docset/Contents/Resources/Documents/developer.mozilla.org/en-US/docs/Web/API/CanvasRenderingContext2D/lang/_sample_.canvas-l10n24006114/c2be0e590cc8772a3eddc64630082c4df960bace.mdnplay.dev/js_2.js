
          const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const selectElem = document.querySelector("select");

const latoMediumFontFace = new FontFace(
  // Lato-Medium is a font with language specific ligatures
  "Lato-Medium",
  'url("https://mdn.github.io/shared-assets/fonts/Lato-Medium.ttf")',
);

latoMediumFontFace.load().then((font) => {
  document.fonts.add(font);
  init();
});

function init() {
  function drawText() {
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    ctx.font = "30px Lato-Medium";
    ctx.color = "black";
    ctx.fillText("finish crafting", 50, 100);
  }

  selectElem.addEventListener("change", () => {
    document.documentElement.lang = selectElem.value;
    drawText();
  });

  drawText();
}
;
        