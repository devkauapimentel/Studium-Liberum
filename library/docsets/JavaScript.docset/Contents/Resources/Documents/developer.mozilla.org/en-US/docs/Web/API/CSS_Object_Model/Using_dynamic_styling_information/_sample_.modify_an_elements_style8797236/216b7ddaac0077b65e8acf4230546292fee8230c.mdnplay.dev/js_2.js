
          const p1 = document.getElementById("p1");
const button = document.querySelector("button");

p1.addEventListener("click", () => {
  p1.style.background = "green";
});
button.addEventListener("click", () => {
  p1.style.background = "white";
});
const el = document.getElementById("some-element");
el.setAttribute("style", "background-color:darkblue;");
;
        