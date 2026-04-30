
          function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.setSelectionRange(2, 5);
}

document.querySelector("button").addEventListener("click", selectText);
;
        