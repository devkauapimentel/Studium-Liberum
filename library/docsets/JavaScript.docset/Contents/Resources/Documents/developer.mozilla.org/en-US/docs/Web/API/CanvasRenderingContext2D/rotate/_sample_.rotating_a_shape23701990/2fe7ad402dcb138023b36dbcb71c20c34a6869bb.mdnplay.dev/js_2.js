
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Point of transform origin
ctx.arc(0, 0, 5, 0, 2 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();

// Non-rotated rectangle
ctx.fillStyle = "gray";
ctx.fillRect(100, 0, 80, 20);

// Rotated rectangle
ctx.rotate((45 * Math.PI) / 180);
ctx.fillStyle = "red";
ctx.fillRect(100, 0, 80, 20);

// Reset transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
;
        