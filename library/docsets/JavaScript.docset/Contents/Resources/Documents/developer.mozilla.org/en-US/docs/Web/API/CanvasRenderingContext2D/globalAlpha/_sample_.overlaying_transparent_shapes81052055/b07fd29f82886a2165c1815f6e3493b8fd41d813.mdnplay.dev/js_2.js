
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw background
ctx.fillStyle = "#ffdd00";
ctx.fillRect(0, 0, 75, 75);
ctx.fillStyle = "#66cc00";
ctx.fillRect(75, 0, 75, 75);
ctx.fillStyle = "#0099ff";
ctx.fillRect(0, 75, 75, 75);
ctx.fillStyle = "#ff3300";
ctx.fillRect(75, 75, 75, 75);
ctx.fillStyle = "white";

// Set transparency value
ctx.globalAlpha = 0.2;

// Draw transparent circles
for (let i = 0; i < 7; i++) {
  ctx.beginPath();
  ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
  ctx.fill();
}
;
        