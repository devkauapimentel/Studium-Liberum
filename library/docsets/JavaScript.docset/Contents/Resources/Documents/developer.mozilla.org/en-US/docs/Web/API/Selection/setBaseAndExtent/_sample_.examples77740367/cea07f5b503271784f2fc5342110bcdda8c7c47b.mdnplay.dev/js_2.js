
          const one = document.querySelector(".one");
const two = document.querySelector(".two");

const aOffset = document.getElementById("aOffset");
const fOffset = document.getElementById("fOffset");

const button = document.querySelector("button");

const output = document.querySelector(".output");

let selection;

button.onclick = () => {
  try {
    selection = document.getSelection();
    selection.setBaseAndExtent(one, aOffset.value, two, fOffset.value);
    const text = selection.toString();
    output.textContent = text;
  } catch (e) {
    output.textContent = e.message;
  }
};
;
        