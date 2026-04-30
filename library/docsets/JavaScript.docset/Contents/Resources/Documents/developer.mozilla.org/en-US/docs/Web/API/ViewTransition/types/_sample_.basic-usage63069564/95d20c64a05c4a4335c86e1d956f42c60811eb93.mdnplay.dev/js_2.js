
          const defaultBtn = document.getElementById("default");
const slideBtn = document.getElementById("slide");
const flipBtn = document.getElementById("flip");
const content = document.querySelector("p");

const first = "This is my first piece of content. I hope you like it!";
const second =
  "This is my second piece of content. Is it better than the first?";
defaultBtn.addEventListener("click", changeContent);
slideBtn.addEventListener("click", changeContent);
flipBtn.addEventListener("click", changeContent);
function changeContent(e) {
  const vt = document.startViewTransition({
    update() {
      content.textContent === first
        ? (content.textContent = second)
        : (content.textContent = first);
    },
  });

  if (e.target === slideBtn) {
    vt.types.add("slide");
  } else if (e.target === flipBtn) {
    vt.types.add("flip");
  }
}
;
        