
          const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#e5e6e9";
ctx.fillRect(0, 0, width, height);
ctx.translate(width / 2, height / 2);
const image = new Image();
image.src =
  "https://developer.mozilla.org/shared-assets/images/examples/web-animations/cat_sprite.png";
image.onload = draw;
let spriteIndex = 0;
let posX = 0;
const spriteWidth = 300;
const spriteHeight = 150;
const totalSprites = 12;
function draw() {
ctx.fillRect(-(width / 2), -(height / 2), width, height);
ctx.drawImage(
  image,
  0,
  spriteIndex * spriteHeight,
  spriteWidth,
  spriteHeight,
  0 + posX,
  -spriteHeight / 2,
  spriteWidth,
  spriteHeight,
);
if (posX % 11 === 0) {
  if (spriteIndex === totalSprites - 1) {
    spriteIndex = 0;
  } else {
    spriteIndex++;
  }
}
if (posX < -width / 2 - spriteWidth) {
  const newStartPos = width / 2;
  posX = Math.ceil(newStartPos);
} else {
  posX -= 2;
}
window.requestAnimationFrame(draw);
}
;
        