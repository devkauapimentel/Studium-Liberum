
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
ctx.font = "36px serif";
ctx.strokeStyle = "red";

baselines.forEach((baseline, index) => {
  ctx.textBaseline = baseline;
  const y = 75 + index * 75;
  ctx.beginPath();
  ctx.moveTo(0, y + 0.5);
  ctx.lineTo(550, y + 0.5);
  ctx.stroke();
  ctx.fillText(`Abcdefghijklmnop (${baseline})`, 0, y);
});
;
        