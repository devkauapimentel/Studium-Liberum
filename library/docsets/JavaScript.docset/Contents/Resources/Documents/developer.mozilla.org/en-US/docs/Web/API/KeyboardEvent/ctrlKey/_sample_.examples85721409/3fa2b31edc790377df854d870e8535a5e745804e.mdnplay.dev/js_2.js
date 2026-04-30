
          const output = document.getElementById("output");

function showChar(e) {
  output.textContent = `Key KeyDown: "${e.key}"
CTRL key KeyDown: ${e.ctrlKey}
`;
}

document.addEventListener("keydown", showChar);
;
        