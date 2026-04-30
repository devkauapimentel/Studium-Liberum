
          let node = document.querySelector("body").firstChild;
let result = "Node names are:\n";
while (node) {
  result += `Value of ${node.nodeName}: ${node.nodeValue}\n`;
  node = node.nextSibling;
}

const output = document.getElementById("result");
output.innerText = result;
;
        