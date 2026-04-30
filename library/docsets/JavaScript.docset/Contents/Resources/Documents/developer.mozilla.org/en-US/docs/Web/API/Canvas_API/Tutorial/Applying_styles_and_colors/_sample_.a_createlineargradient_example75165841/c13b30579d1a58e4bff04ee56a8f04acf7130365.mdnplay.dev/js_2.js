
          function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  // Create gradients
  const linGrad = ctx.createLinearGradient(0, 0, 0, 150);
  linGrad.addColorStop(0, "#00ABEB");
  linGrad.addColorStop(0.5, "white");
  linGrad.addColorStop(0.5, "#26C000");
  linGrad.addColorStop(1, "white");

  const linGrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  linGrad2.addColorStop(0.5, "black");
  linGrad2.addColorStop(1, "transparent");

  // assign gradients to fill and stroke styles
  ctx.fillStyle = linGrad;
  ctx.strokeStyle = linGrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}
draw();
;
        