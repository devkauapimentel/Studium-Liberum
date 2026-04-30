
          const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "25px serif";
const text = "Foo";

const textMetrics = ctx.measureText(text); // returns TextMetrics object
const ascentCssPixels = textMetrics.fontBoundingBoxAscent;
const log = document.getElementById("log");
log.innerText = `fontBoundingBoxAscent: ${ascentCssPixels}`;
;
        