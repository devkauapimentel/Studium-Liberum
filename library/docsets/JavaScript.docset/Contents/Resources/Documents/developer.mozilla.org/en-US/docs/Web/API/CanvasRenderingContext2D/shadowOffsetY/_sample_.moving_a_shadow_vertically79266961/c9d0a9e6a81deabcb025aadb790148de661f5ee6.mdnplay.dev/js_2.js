
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Shadow
ctx.shadowColor = "red";
ctx.shadowOffsetY = 25;
ctx.shadowBlur = 10;

// Rectangle
ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 150, 80);
;
        