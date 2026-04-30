
          const wrapper = document.createElement("div");

wrapper.appendChild(document.createTextNode("Part 1 "));
wrapper.appendChild(document.createTextNode("Part 2 "));

let node = wrapper.firstChild;
let result = "Before normalization:\n";
while (node) {
  result += ` ${node.nodeName}: ${node.nodeValue}\n`;
  node = node.nextSibling;
}

wrapper.normalize();

node = wrapper.firstChild;
result += "\n\nAfter normalization:\n";
while (node) {
  result += ` ${node.nodeName}: ${node.nodeValue}\n`;
  node = node.nextSibling;
}

const output = document.getElementById("result");
output.innerText = result;
;
        