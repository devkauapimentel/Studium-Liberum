
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(50, 50); // Begin first sub-path
ctx.lineTo(200, 50);
ctx.moveTo(50, 90); // Begin second sub-path
ctx.lineTo(280, 120);
ctx.stroke();
;
        