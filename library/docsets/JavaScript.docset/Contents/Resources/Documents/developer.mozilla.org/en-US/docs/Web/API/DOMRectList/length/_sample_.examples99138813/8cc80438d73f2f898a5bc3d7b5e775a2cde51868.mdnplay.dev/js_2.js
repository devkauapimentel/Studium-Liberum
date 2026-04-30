
          const box = document.getElementById("box");
const rects = box.getClientRects();
const output = document.getElementById("output");

output.textContent = `Number of rectangles: ${rects.length}`;
;
        