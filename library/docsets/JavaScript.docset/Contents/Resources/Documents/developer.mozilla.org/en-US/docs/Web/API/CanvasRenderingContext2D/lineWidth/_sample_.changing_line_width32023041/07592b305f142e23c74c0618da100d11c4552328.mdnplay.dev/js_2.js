
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 15;

ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(130, 130);
ctx.rect(40, 40, 70, 70);
ctx.stroke();
;
        