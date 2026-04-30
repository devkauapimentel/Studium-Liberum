
          const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
ctx.font = "16px sans-serif";
ctx.textAlign = "center";

const img = new Image();
img.src = "/shared-assets/images/examples/big-star.png";
img.onload = () => {
  const w = img.width,
    h = img.height;

  ctx.fillText("Source", w * 0.5, 20);
  ctx.drawImage(img, 0, 24, w, h);

  ctx.fillText("Smoothing = TRUE", w * 2.5, 20);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, w, 24, w * 3, h * 3);

  ctx.fillText("Smoothing = FALSE", w * 5.5, 20);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, w * 4, 24, w * 3, h * 3);
};
;
        