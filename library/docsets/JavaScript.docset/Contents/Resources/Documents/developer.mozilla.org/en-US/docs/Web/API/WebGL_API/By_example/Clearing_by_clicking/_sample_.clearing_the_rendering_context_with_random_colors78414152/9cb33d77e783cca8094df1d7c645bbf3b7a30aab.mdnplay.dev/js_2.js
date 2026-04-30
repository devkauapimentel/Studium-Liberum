
          // Adding the same click event handler to both canvas and
// button.
const canvas = document.querySelector("#canvas-view");
const button = document.querySelector("#color-switcher");
canvas.addEventListener("click", switchColor);
button.addEventListener("click", switchColor);

// A variable to hold the WebGLRenderingContext.
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

// The click event handler.
function switchColor() {
  // Get a random color value using a helper function.
  const color = getRandomColor();
  // Set the clear color to the random color.
  gl.clearColor(color[0], color[1], color[2], 1.0);
  // Clear the context with the newly set color. This is
  // the function call that actually does the drawing.
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// Random color helper function.
function getRandomColor() {
  return [Math.random(), Math.random(), Math.random()];
}
;
        