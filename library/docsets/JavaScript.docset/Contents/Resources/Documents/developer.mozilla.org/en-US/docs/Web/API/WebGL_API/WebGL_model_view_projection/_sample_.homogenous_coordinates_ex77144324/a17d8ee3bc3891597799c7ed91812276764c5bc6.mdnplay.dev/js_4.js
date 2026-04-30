
          function createShader(gl, source, type) {
  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    throw new Error(`Could not compile WebGL program.\n\n${info}`);
  }

  return shader;
}

function linkProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    throw new Error(`Could not compile WebGL program.\n\n${info}`);
  }

  return program;
}

function createWebGLProgram(gl, vertexSource, fragmentSource) {
  // Combines createShader() and linkProgram()
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
  return linkProgram(gl, vertexShader, fragmentShader);
}

function createWebGLProgramFromIds(gl, vertexSourceId, fragmentSourceId) {
  const vertexSourceEl = document.getElementById(vertexSourceId);
  const fragmentSourceEl = document.getElementById(fragmentSourceId);

  return createWebGLProgram(
    gl,
    vertexSourceEl.innerHTML,
    fragmentSourceEl.innerHTML,
  );
}
const axisOverlay = document.getElementById("clip-space-axis");
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "path");
const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "path");
yAxis.setAttribute("fill", "none");
yAxis.setAttribute("stroke", "black");
xAxis.setAttribute("fill", "none");
xAxis.setAttribute("stroke", "black");
let yAxisPath = "M 249.5 0 L 249.5 500";
let xAxisPath = "M 0 250.5 L 500 250.5";
for (let i = -10; i <= 10; i++) {
  if (i === 0) continue;
  const length = i % 5 === 0 ? 24 : 12;
  const loc = 250 + i * 25 - 0.5;
  yAxisPath += ` M 249.5 ${loc} L ${249.5 + length} ${loc}`;
  xAxisPath += ` M ${loc} 250.5 L ${loc} ${250.5 - length}`;
}
xAxis.setAttribute("d", xAxisPath);
yAxis.setAttribute("d", yAxisPath);
axisOverlay.appendChild(xAxis);
axisOverlay.appendChild(yAxis);

const textOverlay = document.getElementById("clip-space-text");
for (const label of ["+X", "-X", "+Y", "-Y"]) {
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let x, y;
  if (label === "+X") {
    [x, y] = ["97.5%", "53%"];
  } else if (label === "-X") {
    [x, y] = ["2.5%", "53%"];
  } else if (label === "+Y") {
    [x, y] = ["47%", "2.5%"];
  } else if (label === "-Y") {
    [x, y] = ["47%", "97.5%"];
  }
  textEl.setAttribute("x", x);
  textEl.setAttribute("y", y);
  textEl.setAttribute("text-anchor", "middle");
  textEl.setAttribute("font-family", "'Courier New'");
  textEl.setAttribute("font-size", "16");
  textEl.setAttribute("font-weight", "bold");
  textEl.textContent = label;
  textOverlay.appendChild(textEl);
}
for (let i = -1; i <= 1; i += 0.5) {
  if (i === 0) continue;
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textEl.setAttribute("x", "58%");
  textEl.setAttribute("y", `${50 - i * 48}%`);
  textEl.setAttribute("text-anchor", "end");
  textEl.setAttribute("font-family", "'Courier New'");
  textEl.setAttribute("font-size", "11");
  textEl.textContent = i.toFixed(1);
  textOverlay.appendChild(textEl);
  const textEl2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text",
  );
  textEl2.setAttribute("x", `${50 + i * 50}%`);
  textEl2.setAttribute("y", "45%");
  textEl2.setAttribute("text-anchor", i > 0 ? "end" : "start");
  textEl2.setAttribute("font-family", "'Courier New'");
  textEl2.setAttribute("font-size", "11");
  textEl2.textContent = i.toFixed(1);
  textOverlay.appendChild(textEl2);
}
class WebGLBox {
  canvas = document.getElementById("canvas");
  gl = this.canvas.getContext("webgl");
  webglProgram = createWebGLProgramFromIds(
    this.gl,
    "vertex-shader",
    "fragment-shader",
  );
  positionLocation;
  colorLocation;
  constructor() {
    const gl = this.gl;

    // Setup a WebGL program
    gl.useProgram(this.webglProgram);

    // Save the attribute and uniform locations
    this.positionLocation = gl.getAttribLocation(this.webglProgram, "position");
    this.colorLocation = gl.getUniformLocation(this.webglProgram, "vColor");

    // Tell WebGL to test the depth when drawing, so if a square is behind
    // another square it won't be drawn
    gl.enable(gl.DEPTH_TEST);
  }
  draw(settings) {
    // Create some attribute data; these are the triangles that will end being
    // drawn to the screen. There are two that form a square.

    // prettier-ignore
    const data = new Float32Array([
      // Triangle 1
      settings.left, settings.bottom, settings.depth, settings.w,
      settings.right, settings.bottom, settings.depth, settings.w,
      settings.left, settings.top, settings.depth, settings.w,

      // Triangle 2
      settings.left, settings.top, settings.depth, settings.w,
      settings.right, settings.bottom, settings.depth, settings.w,
      settings.right, settings.top, settings.depth, settings.w,
    ]);

    // Use WebGL to draw this onto the screen.

    // Performance Note: Creating a new array buffer for every draw call is slow.
    // This function is for illustration purposes only.

    const gl = this.gl;

    // Create a buffer and bind the data
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // Setup the pointer to our attribute data (the triangles)
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 4, gl.FLOAT, false, 0, 0);

    // Setup the color uniform that will be shared across all triangles
    gl.uniform4fv(this.colorLocation, settings.color);

    // Draw the triangles to the screen
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

const box = new WebGLBox();
box.draw({
  top: 0.5, // y
  bottom: -0.5, // y
  left: -0.5, // x
  right: 0.5, // x
  w: 0.7, // w - enlarge this box

  depth: 0, // z
  color: [1, 0.4, 0.4, 1], // red
});
box.draw({
  top: 0.9, // y
  bottom: 0, // y
  left: -0.9, // x
  right: 0.9, // x
  w: 1.1, // w - shrink this box

  depth: 0.5, // z
  color: [0.4, 1, 0.4, 1], // green
});
box.draw({
  top: 1, // y
  bottom: -1, // y
  left: -1, // x
  right: 1, // x
  w: 1.5, // w - Bring this box into range

  depth: -1.5, // z
  color: [0.4, 0.4, 1, 1], // blue
});
;
        