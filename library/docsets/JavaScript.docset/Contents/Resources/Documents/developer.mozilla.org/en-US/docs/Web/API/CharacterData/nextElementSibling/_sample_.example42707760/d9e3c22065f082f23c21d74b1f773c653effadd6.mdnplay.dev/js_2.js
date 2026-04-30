
          // Initially, set node to the Text node with `TEXT`
let node = document.getElementById("div-01").previousSibling;

let result = "Next element siblings of TEXT:\n";

while (node) {
  result += `${node.nodeName}\n`;
  node = node.nextElementSibling; // The first node is a CharacterData, the others Element objects
}

document.querySelector("pre").textContent = result;
;
        