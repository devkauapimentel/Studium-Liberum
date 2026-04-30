
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Moved square
ctx.translate(110, 30);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 80, 80);

// Reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);

// Unmoved square
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, 80, 80);
;
        