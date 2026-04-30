
          const buttonBar = document.querySelector(".button-bar");

function setColor(e) {
  buttonBar.style.backgroundColor = e.target.getAttribute("data-color");
}

buttonBar.addEventListener("click", setColor);
;
        