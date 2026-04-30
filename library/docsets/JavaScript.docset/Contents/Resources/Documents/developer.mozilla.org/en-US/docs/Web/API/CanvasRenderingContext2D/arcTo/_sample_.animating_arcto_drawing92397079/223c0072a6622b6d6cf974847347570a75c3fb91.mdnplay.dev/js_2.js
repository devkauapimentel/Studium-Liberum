
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const controlOut = document.getElementById("radius-output");
const control = document.getElementById("radius");
let radius = control.value; // match with init control value
control.oninput = () => {
  controlOut.textContent = radius = control.value;
};

const p1 = { x: 100, y: 100 };
const p2 = { x: 150, y: 50 };
const p3 = { x: 200, y: 100 };

function labelPoint(p, offset, i = 0) {
  const { x, y } = offset;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(`${i}:(${p.x}, ${p.y})`, p.x + x, p.y + y);
}

function drawPoints(points) {
  points.forEach((p, i) => {
    labelPoint(p, { x: 0, y: -20 }, `p${i}`);
  });
}

// Draw arc
function drawArc([p0, p1, p2], r) {
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.arcTo(p1.x, p1.y, p2.x, p2.y, r);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function loop(t) {
  const angle = (t / 1000) % (2 * Math.PI);
  const rr = Math.abs(Math.cos(angle) * radius);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawArc([p1, p2, p3], rr);
  drawPoints([p1, p2, p3]);
  requestAnimationFrame(loop);
}

loop(0);
;
        