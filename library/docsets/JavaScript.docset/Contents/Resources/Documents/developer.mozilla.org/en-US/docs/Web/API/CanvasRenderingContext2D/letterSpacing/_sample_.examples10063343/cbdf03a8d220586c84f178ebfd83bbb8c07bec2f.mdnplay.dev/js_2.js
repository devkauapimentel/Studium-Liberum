
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "30px serif";

// Default letter spacing
ctx.fillText(`Hello world (default: ${ctx.letterSpacing})`, 10, 40);

// Custom letter spacing: 10px
ctx.letterSpacing = "10px";
ctx.fillText(`Hello world (${ctx.letterSpacing})`, 10, 90);

// Custom letter spacing: 20px
ctx.letterSpacing = "20px";
ctx.fillText(`Hello world (${ctx.letterSpacing})`, 10, 140);
;
        