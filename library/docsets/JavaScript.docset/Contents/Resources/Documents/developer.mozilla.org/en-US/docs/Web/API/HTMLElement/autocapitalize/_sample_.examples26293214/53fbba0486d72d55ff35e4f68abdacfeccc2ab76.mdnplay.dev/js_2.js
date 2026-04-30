
          const label = document.getElementById("ac-label");
const element = document.getElementById("ac-element");
const controller = document.getElementById("ac-controller");

controller.addEventListener("input", (e) => {
  const behavior = e.target.value;
  label.textContent = behavior;
  element.autocapitalize = behavior;
});
;
        