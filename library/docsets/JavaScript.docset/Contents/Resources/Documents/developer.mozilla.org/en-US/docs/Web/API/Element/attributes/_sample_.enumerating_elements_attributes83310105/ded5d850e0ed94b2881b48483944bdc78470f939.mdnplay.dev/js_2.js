
          const paragraph = document.getElementById("paragraph");
const result = document.getElementById("result");
const btn = document.querySelector("input[type='button']");

btn.addEventListener("click", () => {
  // First, let's verify that the paragraph has some attributes
  if (paragraph.hasAttributes()) {
    let output = "Attributes of first paragraph:\n";
    for (const attr of paragraph.attributes) {
      output += `${attr.name} -> ${attr.value}\n`;
    }
    result.textContent = output;
  } else {
    result.textContent = "No attributes to show";
  }
});
;
        