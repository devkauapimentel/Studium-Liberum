
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "canvas_create_pattern.png";
// Only use the image after it's loaded
img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 300, 300);
};
;
        