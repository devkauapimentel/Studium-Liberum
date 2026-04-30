
          function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgb(0 0 0 / 50%)";

  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
}
draw();
;
        