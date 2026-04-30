
          const mapElement = document.getElementById("image-map");
const outputElement = document.querySelector("output");

for (const area of mapElement.areas) {
  area.addEventListener("click", (event) => {
    outputElement.textContent = `You clicked on the ${area.alt} area.\n\n`;
  });
}
;
        