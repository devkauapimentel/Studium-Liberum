
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw yellow background
ctx.beginPath();
ctx.fillStyle = "#ffff66";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw blue triangle
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.moveTo(20, 20);
ctx.lineTo(180, 20);
ctx.lineTo(130, 130);
ctx.closePath();
ctx.fill();

// Clear part of the canvas
ctx.clearRect(10, 10, 120, 100);
;
        