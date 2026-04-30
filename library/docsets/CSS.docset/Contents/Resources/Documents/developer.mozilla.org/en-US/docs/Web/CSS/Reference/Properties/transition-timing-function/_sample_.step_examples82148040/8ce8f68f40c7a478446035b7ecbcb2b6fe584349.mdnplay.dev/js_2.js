
          function updateTransition() {
  const els = document.querySelectorAll(".parent > div[class]");
  for (const el of els) {
    el.classList.toggle("box1");
  }
}

const intervalID = setInterval(updateTransition, 10000);
;
        