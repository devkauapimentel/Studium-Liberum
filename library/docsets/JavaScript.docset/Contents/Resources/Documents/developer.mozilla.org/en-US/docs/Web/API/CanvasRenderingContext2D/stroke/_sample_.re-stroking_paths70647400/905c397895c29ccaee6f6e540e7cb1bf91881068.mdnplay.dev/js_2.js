
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// First sub-path
ctx.lineWidth = 26;
ctx.strokeStyle = "orange";
ctx.moveTo(20, 20);
ctx.lineTo(160, 20);
ctx.stroke();

// Second sub-path
ctx.lineWidth = 14;
ctx.strokeStyle = "green";
ctx.moveTo(20, 80);
ctx.lineTo(220, 80);
ctx.stroke();

// Third sub-path
ctx.lineWidth = 4;
ctx.strokeStyle = "pink";
ctx.moveTo(20, 140);
ctx.lineTo(280, 140);
ctx.stroke();
;
        