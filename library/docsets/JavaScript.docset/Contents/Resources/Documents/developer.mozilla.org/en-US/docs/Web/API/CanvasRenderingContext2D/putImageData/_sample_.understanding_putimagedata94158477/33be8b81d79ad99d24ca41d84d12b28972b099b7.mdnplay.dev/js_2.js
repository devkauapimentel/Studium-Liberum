
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function putImageData(
  ctx,
  imageData,
  dx,
  dy,
  dirtyX = 0,
  dirtyY = 0,
  dirtyWidth = imageData.width,
  dirtyHeight = imageData.height,
) {
  const data = imageData.data;
  const height = imageData.height;
  const width = imageData.width;
  const limitBottom = dirtyY + dirtyHeight;
  const limitRight = dirtyX + dirtyWidth;
  for (let y = dirtyY; y < limitBottom; y++) {
    for (let x = dirtyX; x < limitRight; x++) {
      const pos = y * width + x;
      ctx.fillStyle = `rgb(${data[pos * 4 + 0]} ${data[pos * 4 + 1]}
      ${data[pos * 4 + 2]} / ${data[pos * 4 + 3] / 255})`;
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  }
}

// Draw content onto the canvas
ctx.fillRect(0, 0, 100, 100);
// Create an ImageData object from it
const imagedata = ctx.getImageData(0, 0, 100, 100);
// use the putImageData function that illustrates how putImageData works
putImageData(ctx, imagedata, 150, 0, 50, 50, 25, 25);
;
        