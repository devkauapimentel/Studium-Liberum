
          const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);
const image = new Image();
image.src =
  "https://mdn.github.io/shared-assets/images/examples/fx-nightly-512.png";
image.addEventListener("load", () =>
  ctx.drawImage(image, 0, 0, 512, 512, 50, 40, 185, 185),
);
canvas.setAttribute("aria-label", "Firefox Logo");
;
        