
          const pasteButton = document.querySelector("#paste");
const textBox = document.querySelector("#text_box");

pasteButton.addEventListener("click", () => {
  textBox.focus();

  let pasted = document.execCommand("paste", false);
  if (!pasted) {
    textBox.textContent = "paste unsuccessful, execCommand not supported";
  }
});
;
        