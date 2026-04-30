
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Shadow
ctx.shadowColor = "rgb(255 0 0 / 80%)";
ctx.shadowBlur = 8;
ctx.shadowOffsetX = 30;
ctx.shadowOffsetY = 20;

// Filled rectangle
ctx.fillStyle = "rgb(0 255 0 / 20%)";
ctx.fillRect(10, 10, 150, 100);

// Stroked rectangle
ctx.lineWidth = 10;
ctx.strokeStyle = "rgb(0 0 255 / 60%)";
ctx.strokeRect(10, 10, 150, 100);
;
        