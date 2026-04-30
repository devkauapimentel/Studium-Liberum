
          const examples = document.querySelectorAll(".example");
const output = document.getElementById("output");

examples.forEach((element) => {
  const style = getComputedStyle(element);
  output.textContent += `${element.className}: ${style.getPropertyValue("background-color")}\n`;
});
;
        