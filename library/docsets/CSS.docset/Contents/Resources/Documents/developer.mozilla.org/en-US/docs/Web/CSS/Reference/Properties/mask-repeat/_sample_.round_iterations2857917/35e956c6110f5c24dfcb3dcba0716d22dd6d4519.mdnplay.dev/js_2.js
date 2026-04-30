
          const div = document.querySelector("div");
const range = document.getElementById("width");
const output = document.querySelector("span");

range.addEventListener("change", () => {
  const value = `${range.value}px`;
  output.innerText = value;
  div.style.width = value;
});
;
        