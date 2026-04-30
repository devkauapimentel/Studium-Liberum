
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.setLineDash([10, 20]);
console.log(ctx.getLineDash()); // [10, 20]

// Draw a dashed line
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(300, 50);
ctx.stroke();
;
        