
          const range = document.createRange();
range.selectNode(document.querySelector("div"));
rectList = range.getClientRects();

const output = document.querySelector("#output");
for (const rect of rectList) {
  output.textContent = `${output.textContent}\n${rect.width}:${rect.height}`;
}
;
        