
          const label = document.getElementById("translate-label");
const element = document.getElementById("translate-element");
const controller = document.getElementById("translate-controller");

controller.addEventListener("change", (e) => {
  if (controller.checked) {
    element.translate = true;
    label.innerText = "The content may be translated:";
  } else {
    element.translate = false;
    label.innerText = "The content may not be translated:";
  }
});
;
        