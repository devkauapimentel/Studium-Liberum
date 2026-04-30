
          const ctx = document.getElementById("canvas").getContext("2d");
ctx.lineWidth = 10;

["round", "bevel", "miter"].forEach((join, i) => {
  ctx.lineJoin = join;
  ctx.beginPath();
  ctx.moveTo(-5, 5 + i * 40);
  ctx.lineTo(35, 45 + i * 40);
  ctx.lineTo(75, 5 + i * 40);
  ctx.lineTo(115, 45 + i * 40);
  ctx.lineTo(155, 5 + i * 40);
  ctx.stroke();
});
;
        