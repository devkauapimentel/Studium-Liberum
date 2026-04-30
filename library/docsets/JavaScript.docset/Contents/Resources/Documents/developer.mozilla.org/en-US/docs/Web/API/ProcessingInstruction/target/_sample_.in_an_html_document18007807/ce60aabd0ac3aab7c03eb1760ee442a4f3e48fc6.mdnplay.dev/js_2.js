
          const node = document.querySelector("pre").previousSibling.previousSibling;
const result = `Node with the processing instruction: ${node.nodeName}: ${node.nodeValue}\n`;
document.querySelector("pre").textContent = result;
;
        