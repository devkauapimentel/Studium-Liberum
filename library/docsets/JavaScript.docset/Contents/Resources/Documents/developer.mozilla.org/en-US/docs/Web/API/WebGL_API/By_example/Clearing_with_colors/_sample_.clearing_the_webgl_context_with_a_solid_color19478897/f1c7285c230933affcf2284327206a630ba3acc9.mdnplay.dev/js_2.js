
          // References to the document elements.
const paragraph = document.querySelector("p");
const canvas = document.querySelector("canvas");

// Getting the WebGL rendering context.
const gl = canvas.getContext("webgl");

paragraph.textContent = "Congratulations! Your browser supports WebGL.";
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
// Set the clear color to darkish green.
gl.clearColor(0.0, 0.5, 0.0, 1.0);
// Clear the context with the newly set color. This is
// the function call that actually does the drawing.
gl.clear(gl.COLOR_BUFFER_BIT);
;
        