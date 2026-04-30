
          const backBtn = document.getElementById("backwards");
const fwdBtn = document.getElementById("forwards");
const content = document.querySelector("p");

const first = "This is my first piece of content. I hope you like it!";
const second =
  "This is my second piece of content. Is it better than the first?";
backBtn.addEventListener("click", changeContent);
fwdBtn.addEventListener("click", changeContent);
function changeContent(e) {
  const type = e.target === backBtn ? "backwards" : "forwards";
  document.startViewTransition({
    update() {
      content.textContent === first
        ? (content.textContent = second)
        : (content.textContent = first);
    },
    types: [type],
  });
}
;
        