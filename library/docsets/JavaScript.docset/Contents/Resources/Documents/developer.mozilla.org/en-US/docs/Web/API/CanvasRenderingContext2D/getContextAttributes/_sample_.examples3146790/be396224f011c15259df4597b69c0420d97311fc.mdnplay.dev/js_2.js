
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += text;
}
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d", { alpha: false });
if (ctx.getContextAttributes) {
  const attributes = ctx.getContextAttributes();
  log(JSON.stringify(attributes));
} else {
  log("CanvasRenderingContext2D.getContextAttributes() is not supported");
}
;
        