
          // Initially set node to the Text node with `SOME TEXT`
let node = document.getElementById("div-02").nextSibling;

let result = "Previous element siblings of SOME TEXT:\n";

while (node) {
  result += `${node.nodeName}\n`;
  node = node.previousElementSibling;
}

document.querySelector("pre").textContent = result;
;
        