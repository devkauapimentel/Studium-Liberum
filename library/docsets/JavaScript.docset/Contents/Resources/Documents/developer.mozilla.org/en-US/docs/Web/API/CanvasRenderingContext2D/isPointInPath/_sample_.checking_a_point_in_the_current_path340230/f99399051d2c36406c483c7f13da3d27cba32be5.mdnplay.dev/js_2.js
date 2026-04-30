
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");

ctx.rect(10, 10, 100, 100);
ctx.fill();
result.innerText = ctx.isPointInPath(30, 70);
;
        