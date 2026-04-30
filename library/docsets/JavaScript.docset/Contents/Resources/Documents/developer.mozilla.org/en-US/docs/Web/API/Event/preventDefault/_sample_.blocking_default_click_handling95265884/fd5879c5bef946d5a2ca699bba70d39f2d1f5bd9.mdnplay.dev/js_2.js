
          const checkbox = document.querySelector("#id-checkbox");

checkbox.addEventListener("click", checkboxClick);

function checkboxClick(event) {
  const warn = "preventDefault() won't let you check this!\n";
  document.getElementById("output-box").innerText += warn;
  event.preventDefault();
}
;
        