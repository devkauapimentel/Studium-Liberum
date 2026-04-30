
          const sections = document.querySelectorAll("section");
const form = document.querySelector("form");

function updateScope(val) {
  sections.forEach((section) => (section.style.anchorScope = val));
}

form.addEventListener("input", (e) => {
  updateScope(e.target.value);
});

updateScope("all");
;
        