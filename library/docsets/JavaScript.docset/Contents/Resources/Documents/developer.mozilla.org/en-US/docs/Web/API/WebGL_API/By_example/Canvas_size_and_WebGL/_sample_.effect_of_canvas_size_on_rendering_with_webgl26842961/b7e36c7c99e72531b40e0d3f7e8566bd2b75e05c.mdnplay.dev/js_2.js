
          const [firstCanvas, secondCanvas] = document.getElementsByTagName("canvas");
firstCanvas.width = firstCanvas.clientWidth;
firstCanvas.height = firstCanvas.clientHeight;
[firstCanvas, secondCanvas].forEach((canvas) => {
  const gl = canvas.getContext("webgl");
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(30, 10, 60, 60);
  gl.clearColor(1.0, 1.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});
;
        