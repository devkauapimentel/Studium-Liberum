
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "20px serif";

// Default (auto)
ctx.fillText(`Hello world (default: ${ctx.textRendering})`, 5, 20);

// Text rendering: optimizeSpeed
ctx.textRendering = "optimizeSpeed";
ctx.fillText(`Hello world (${ctx.textRendering})`, 5, 50);

// Text rendering: optimizeLegibility
ctx.textRendering = "optimizeLegibility";
ctx.fillText(`Hello world (${ctx.textRendering})`, 5, 80);

// Text rendering: geometricPrecision
ctx.textRendering = "geometricPrecision";
ctx.fillText(`Hello world (${ctx.textRendering})`, 5, 110);
;
        