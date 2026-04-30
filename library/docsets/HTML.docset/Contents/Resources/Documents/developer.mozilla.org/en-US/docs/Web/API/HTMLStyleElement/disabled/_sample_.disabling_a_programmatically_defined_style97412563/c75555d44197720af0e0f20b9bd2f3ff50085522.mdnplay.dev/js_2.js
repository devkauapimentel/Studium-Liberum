
          // Create the `style` element
const style = document.createElement("style");
const node = document.createTextNode("p { color: blue; }");
style.appendChild(node);
document.body.appendChild(style);
// Disable the style
style.disabled = true;
const button = document.querySelector("button");

button.addEventListener("click", () => {
  style.disabled = !style.disabled;
  const buttonText = style.disabled ? "Enable" : "Disable";
  button.innerText = buttonText;
});
;
        