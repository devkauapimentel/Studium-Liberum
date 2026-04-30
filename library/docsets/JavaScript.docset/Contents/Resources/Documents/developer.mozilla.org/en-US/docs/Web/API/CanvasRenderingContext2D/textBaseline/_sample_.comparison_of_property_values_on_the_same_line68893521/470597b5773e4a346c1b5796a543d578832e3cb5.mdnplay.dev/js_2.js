
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const baselines = [
  "top",
  "hanging",
  "middle",
  "alphabetic",
  "ideographic",
  "bottom",
];
ctx.font = "20px serif";
ctx.strokeStyle = "red";

ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(840, 100);
ctx.moveTo(0, 55);
ctx.stroke();

baselines.forEach((baseline, index) => {
  ctx.save();
  ctx.textBaseline = baseline;
  let x = index * 120 + 10;
  ctx.fillText("Abcdefghijk", x, 100);
  ctx.restore();
  ctx.fillText(baseline, x + 5, 50);
});
;
        