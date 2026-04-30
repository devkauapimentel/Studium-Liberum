
          const box = document.querySelector(".box");
const button = document.querySelector(".runButton");
const colorChangeFrames = { backgroundColor: ["grey", "lime"] };

button.addEventListener("click", playAnimation);
function playAnimation() {
  button.setAttribute("disabled", true);
  const anim = box.animate(colorChangeFrames, 4000);

  anim.addEventListener("finish", (event) => {
    button.removeAttribute("disabled");
  });
}
;
        