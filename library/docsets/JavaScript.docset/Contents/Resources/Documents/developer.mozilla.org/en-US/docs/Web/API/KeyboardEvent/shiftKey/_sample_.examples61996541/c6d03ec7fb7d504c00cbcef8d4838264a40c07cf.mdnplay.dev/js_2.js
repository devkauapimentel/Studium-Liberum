
          const output = document.getElementById("output");

function showChar(e) {
  output.textContent = `Key KeyDown: "${e.key}"
SHIFT key KeyDown: ${e.shiftKey}
`;
}

document.addEventListener("keydown", showChar);
;
        