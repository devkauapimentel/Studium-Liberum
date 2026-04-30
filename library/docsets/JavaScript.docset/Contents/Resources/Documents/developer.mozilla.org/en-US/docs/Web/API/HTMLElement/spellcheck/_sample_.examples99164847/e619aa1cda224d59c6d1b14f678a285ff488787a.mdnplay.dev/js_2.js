
          const label = document.getElementById("sc-label");
const element = document.getElementById("sc-element");
const controller = document.getElementById("sc-controller");

controller.addEventListener("change", (e) => {
  if (controller.checked) {
    element.spellcheck = true;
    label.innerText = "The spelling and grammar may be checked: ";
  } else {
    element.spellcheck = false;
    label.innerText = "The spelling and grammar may not be checked: ";
  }
});
;
        