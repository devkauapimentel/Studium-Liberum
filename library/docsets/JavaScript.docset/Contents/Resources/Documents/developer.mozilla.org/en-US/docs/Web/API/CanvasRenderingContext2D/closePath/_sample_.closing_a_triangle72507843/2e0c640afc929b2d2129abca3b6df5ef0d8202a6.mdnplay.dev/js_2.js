
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(20, 140); // Move pen to bottom-left corner
ctx.lineTo(120, 10); // Line to top corner
ctx.lineTo(220, 140); // Line to bottom-right corner
ctx.closePath(); // Line to bottom-left corner
ctx.stroke();
;
        