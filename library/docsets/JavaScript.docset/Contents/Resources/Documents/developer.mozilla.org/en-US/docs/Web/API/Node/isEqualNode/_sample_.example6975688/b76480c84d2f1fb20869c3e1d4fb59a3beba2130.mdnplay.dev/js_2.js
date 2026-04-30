
          const output = document.getElementById("output");
const divList = document.getElementsByTagName("div");

output.innerText += `div 0 equals div 0: ${divList[0].isEqualNode(
  divList[0],
)}\n`;
output.innerText += `div 0 equals div 1: ${divList[0].isEqualNode(
  divList[1],
)}\n`;
output.innerText += `div 0 equals div 2: ${divList[0].isEqualNode(
  divList[2],
)}\n`;
;
        