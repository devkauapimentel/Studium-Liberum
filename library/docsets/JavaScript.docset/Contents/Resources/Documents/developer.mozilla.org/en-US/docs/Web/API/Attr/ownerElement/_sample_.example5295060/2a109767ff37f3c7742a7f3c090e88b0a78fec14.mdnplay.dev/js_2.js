
          const elements = document.querySelectorAll(".struct");
const buttons = document.querySelectorAll("button");
const outputEl = document.querySelector("#result");

let i = 0;
for (const button of buttons) {
  const element = elements[i];
  button.addEventListener("click", () => {
    const attribute = element.attributes[0];
    outputEl.value = attribute.ownerElement.tagName.toLowerCase();
  });
  i++;
}
;
        