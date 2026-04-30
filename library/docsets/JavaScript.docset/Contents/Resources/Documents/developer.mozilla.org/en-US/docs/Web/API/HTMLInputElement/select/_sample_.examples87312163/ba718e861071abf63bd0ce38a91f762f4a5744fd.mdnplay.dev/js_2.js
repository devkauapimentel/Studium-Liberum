
          function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.select();
}

document.querySelector("button").addEventListener("click", selectText);
;
        