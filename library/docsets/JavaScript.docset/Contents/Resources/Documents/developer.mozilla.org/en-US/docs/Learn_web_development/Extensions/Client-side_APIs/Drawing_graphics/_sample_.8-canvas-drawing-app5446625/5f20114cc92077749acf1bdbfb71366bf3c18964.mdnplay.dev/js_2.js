
          const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight - 85);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);

const colorPicker = document.querySelector('input[type="color"]');
const sizePicker = document.querySelector('input[type="range"]');
const output = document.querySelector(".output");
const clearBtn = document.querySelector("button");

// covert degrees to radians
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

// update sizePicker output value

sizePicker.addEventListener(
  "input",
  () => (output.textContent = sizePicker.value),
);
let curX;
let curY;
let pressed = false;

// update mouse pointer coordinates
document.addEventListener("mousemove", (e) => {
  curX = e.pageX;
  curY = e.pageY;
});

canvas.addEventListener("mousedown", () => (pressed = true));

canvas.addEventListener("mouseup", () => (pressed = false));
clearBtn.addEventListener("click", () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
});
function draw() {
  if (pressed) {
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(
      curX,
      curY - 85,
      sizePicker.value,
      degToRad(0),
      degToRad(360),
      false,
    );
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
;
        