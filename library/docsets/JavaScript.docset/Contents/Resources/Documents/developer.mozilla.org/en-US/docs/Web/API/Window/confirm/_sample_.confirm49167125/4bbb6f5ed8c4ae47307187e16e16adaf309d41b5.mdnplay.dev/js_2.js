
          const windowButton = document.querySelector("#windowButton");
const log = document.querySelector("#log");

windowButton.addEventListener("click", () => {
  if (window.confirm("Do you want to open in new tab?")) {
    window.open("https://developer.mozilla.org/en-US/docs/Web/API/Window/open");
  } else {
    log.innerText = "Glad you're staying!";
  }
});
;
        