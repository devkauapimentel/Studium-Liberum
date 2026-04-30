
          const output = document.getElementById("output");
const divList = document.getElementsByTagName("div");

output.innerText += `div 0 same as div 0: ${divList[0].isSameNode(
  divList[0],
)}\n`;
output.innerText += `div 0 same as div 1: ${divList[0].isSameNode(
  divList[1],
)}\n`;
output.innerText += `div 0 same as div 2: ${divList[0].isSameNode(
  divList[2],
)}\n`;
;
        