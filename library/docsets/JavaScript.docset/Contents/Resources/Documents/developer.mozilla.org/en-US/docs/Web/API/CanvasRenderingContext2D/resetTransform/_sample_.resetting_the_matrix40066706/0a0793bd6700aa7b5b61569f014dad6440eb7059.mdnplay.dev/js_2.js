
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw a rotated rectangle
ctx.rotate((45 * Math.PI) / 180);
ctx.fillRect(60, 0, 100, 30);

// Reset transformation matrix to the identity matrix
ctx.resetTransform();
;
        