
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create ellipse
const ellipse = new Path2D();
ellipse.ellipse(150, 75, 40, 60, Math.PI * 0.25, 0, 2 * Math.PI);
ctx.lineWidth = 25;
ctx.strokeStyle = "red";
ctx.fill(ellipse);
ctx.stroke(ellipse);

// Listen for mouse moves
canvas.addEventListener("mousemove", (event) => {
  // Check whether point is inside ellipse's stroke
  const isPointInStroke = ctx.isPointInStroke(
    ellipse,
    event.offsetX,
    event.offsetY,
  );
  ctx.strokeStyle = isPointInStroke ? "green" : "red";

  // Draw ellipse
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(ellipse);
  ctx.stroke(ellipse);
});
;
        