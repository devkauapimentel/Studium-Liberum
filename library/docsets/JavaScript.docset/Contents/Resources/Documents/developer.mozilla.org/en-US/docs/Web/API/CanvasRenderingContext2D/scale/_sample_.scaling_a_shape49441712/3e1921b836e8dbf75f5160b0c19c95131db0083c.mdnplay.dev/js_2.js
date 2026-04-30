
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Scaled rectangle
ctx.scale(9, 3);
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 8, 20);

// Reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);

// Non-scaled rectangle
ctx.fillStyle = "gray";
ctx.fillRect(10, 10, 8, 20);
;
        