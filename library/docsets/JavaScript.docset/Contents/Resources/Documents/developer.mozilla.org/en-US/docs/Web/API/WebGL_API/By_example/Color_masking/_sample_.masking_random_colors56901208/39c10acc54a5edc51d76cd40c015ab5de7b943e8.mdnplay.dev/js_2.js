
          const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

const timer = setInterval(drawAnimation, 1000);

const mask = [true, true, true];
const redToggle = document.querySelector("#red-toggle");
const greenToggle = document.querySelector("#green-toggle");
const blueToggle = document.querySelector("#blue-toggle");
redToggle.addEventListener("click", setColorMask);
greenToggle.addEventListener("click", setColorMask);
blueToggle.addEventListener("click", setColorMask);

function setColorMask(evt) {
  const index =
    (evt.target === greenToggle && 1) || (evt.target === blueToggle && 2) || 0;
  mask[index] = !mask[index];
  evt.target.textContent = mask[index] ? "On" : "Off";
  gl.colorMask(mask[0], mask[1], mask[2], true);
  drawAnimation();
}

function drawAnimation() {
  const color = getRandomColor();
  gl.clearColor(color[0], color[1], color[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}
;
        