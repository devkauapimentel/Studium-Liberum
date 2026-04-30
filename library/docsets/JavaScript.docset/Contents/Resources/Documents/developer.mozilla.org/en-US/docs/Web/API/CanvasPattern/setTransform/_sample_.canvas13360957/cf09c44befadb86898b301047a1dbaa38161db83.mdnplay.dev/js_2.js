
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const matrix = new DOMMatrix([1, 0.2, 0.8, 1, 0, 0]);

const img = new Image();
img.src = "canvas_create_pattern.png";

img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  pattern.setTransform(matrix.rotate(-45).scale(1.5));
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 400, 400);
};
;
        