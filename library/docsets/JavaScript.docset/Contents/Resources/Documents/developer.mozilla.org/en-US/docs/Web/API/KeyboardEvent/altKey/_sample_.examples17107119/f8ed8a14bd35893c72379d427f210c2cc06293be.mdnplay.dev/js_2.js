
          const output = document.getElementById("output");

function showChar(e) {
  output.textContent = `Key KeyDown: "${e.key}"
ALT key KeyDown: ${e.altKey}
`;
}

document.addEventListener("keydown", showChar);
;
        