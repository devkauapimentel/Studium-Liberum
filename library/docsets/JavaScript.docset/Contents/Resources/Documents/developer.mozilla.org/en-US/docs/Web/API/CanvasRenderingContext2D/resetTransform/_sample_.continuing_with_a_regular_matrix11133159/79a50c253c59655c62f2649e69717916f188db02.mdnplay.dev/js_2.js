
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Skewed rectangles
ctx.transform(1, 0, 1.7, 1, 0, 0);
ctx.fillStyle = "gray";
ctx.fillRect(40, 40, 50, 20);
ctx.fillRect(40, 90, 50, 20);

// Non-skewed rectangles
ctx.resetTransform();
ctx.fillStyle = "red";
ctx.fillRect(40, 40, 50, 20);
ctx.fillRect(40, 90, 50, 20);
;
        