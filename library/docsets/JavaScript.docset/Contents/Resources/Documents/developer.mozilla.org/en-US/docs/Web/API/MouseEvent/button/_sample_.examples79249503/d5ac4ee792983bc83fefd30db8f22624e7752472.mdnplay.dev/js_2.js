
          const button = document.querySelector("#button");
const log = document.querySelector("#log");
button.addEventListener("mouseup", (e) => {
  switch (e.button) {
    case 0:
      log.textContent = "Left button clicked.";
      break;
    case 1:
      log.textContent = "Middle button clicked.";
      break;
    case 2:
      log.textContent = "Right button clicked.";
      break;
    default:
      log.textContent = `Unknown button code: ${e.button}`;
  }
});
button.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
;
        