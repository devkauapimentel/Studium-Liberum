
          const defaultColor = "#0000ff";
const colorPicker = document.querySelector("#color-picker");
colorPicker.value = defaultColor;
colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", updateAll);
colorPicker.select();
function updateFirst(event) {
  const p = document.querySelector("p");
  if (p) {
    p.style.color = event.target.value;
  }
}
function updateAll(event) {
  document.querySelectorAll("p").forEach((p) => {
    p.style.color = event.target.value;
  });
}
;
        