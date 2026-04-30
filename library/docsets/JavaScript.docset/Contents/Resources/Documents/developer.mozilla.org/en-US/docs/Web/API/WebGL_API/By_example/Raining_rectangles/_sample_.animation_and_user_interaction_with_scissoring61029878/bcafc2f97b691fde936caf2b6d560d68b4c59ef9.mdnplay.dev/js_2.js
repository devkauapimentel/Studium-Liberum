
          const canvas = document.querySelector("canvas");
const [scoreDisplay, missesDisplay] = document.querySelectorAll("strong");

function getRenderingContext() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const gl = canvas.getContext("webgl");
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}

const gl = getRenderingContext();
gl.enable(gl.SCISSOR_TEST);

function getRandomVector() {
  return [Math.random(), Math.random(), Math.random()];
}

class Rectangle {
  constructor() {
    // We get three random numbers and use them for new rectangle
    // size and position. For each we use a different number,
    // because we want horizontal size, vertical size and
    // position to be determined independently.
    const randVec = getRandomVector();
    this.size = [5 + 120 * randVec[0], 5 + 120 * randVec[1]];
    this.position = [
      randVec[2] * (gl.drawingBufferWidth - this.size[0]),
      gl.drawingBufferHeight,
    ];
    this.velocity = 1.0 + 6.0 * Math.random();
    this.color = getRandomVector();
    gl.clearColor(this.color[0], this.color[1], this.color[2], 1.0);
  }
}

let rainingRect = new Rectangle();

let score = 0;
let misses = 0;
let timer = null;
function drawAnimation() {
  gl.scissor(
    rainingRect.position[0],
    rainingRect.position[1],
    rainingRect.size[0],
    rainingRect.size[1],
  );
  gl.clear(gl.COLOR_BUFFER_BIT);
  rainingRect.position[1] -= rainingRect.velocity;
  if (rainingRect.position[1] < 0) {
    misses += 1;
    missesDisplay.textContent = misses;
    rainingRect = new Rectangle();
  }
  // We are using setTimeout for animation. So we reschedule
  // the timeout to call drawAnimation again in 17ms.
  // Otherwise we won't get any animation.
  timer = setTimeout(drawAnimation, 17);
}

function playerClick(evt) {
  // We need to transform the position of the click event from
  // window coordinates to relative position inside the canvas.
  // In addition we need to remember that vertical position in
  // WebGL increases from bottom to top, unlike in the browser
  // window.
  const position = [
    evt.pageX - evt.target.offsetLeft,
    gl.drawingBufferHeight - (evt.pageY - evt.target.offsetTop),
  ];
  // If the click falls inside the rectangle, we caught it.

  // Increment score and create a new rectangle.
  const diffPos = [
    position[0] - rainingRect.position[0],
    position[1] - rainingRect.position[1],
  ];
  if (
    diffPos[0] >= 0 &&
    diffPos[0] < rainingRect.size[0] &&
    diffPos[1] >= 0 &&
    diffPos[1] < rainingRect.size[1]
  ) {
    score += 1;
    scoreDisplay.textContent = score;
    rainingRect = new Rectangle();
  }
}

timer = setTimeout(drawAnimation, 17);
canvas.addEventListener("click", playerClick);
;
        