
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Quadratic Bézier curve
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.quadraticCurveTo(230, 30, 50, 100);
ctx.stroke();

// Start and end points
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(50, 20, 5, 0, 2 * Math.PI); // Start point
ctx.arc(50, 100, 5, 0, 2 * Math.PI); // End point
ctx.fill();

// Control point
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(230, 30, 5, 0, 2 * Math.PI);
ctx.fill();
;
        