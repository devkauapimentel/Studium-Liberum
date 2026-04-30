
          const box = document.querySelector(".box");
const button = document.querySelector(".runButton");

/*
  equivalent to the following CSS @keyframes

  @keyframes colorChange {
    0% {
      background-color: grey;
    }
    100% {
      background-color: lime;
    }
  }
*/
const colorChangeFrames = { backgroundColor: ["grey", "lime"] };

function playAnimation() {
  box.animate(colorChangeFrames, 4000);
}
button.addEventListener("click", playAnimation);
;
        