
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(180, 90);
ctx.arcTo(180, 130, 110, 130, 130);
ctx.lineTo(110, 130);
ctx.stroke();
;
        