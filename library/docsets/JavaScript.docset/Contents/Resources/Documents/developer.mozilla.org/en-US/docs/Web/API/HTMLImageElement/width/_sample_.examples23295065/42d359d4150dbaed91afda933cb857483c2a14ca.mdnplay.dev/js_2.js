
          const clockImage = document.querySelector("img");
let output = document.querySelector(".size");

const updateWidth = () => {
  output.innerText = clockImage.width;
};

updateWidth();
window.addEventListener("resize", updateWidth);
;
        