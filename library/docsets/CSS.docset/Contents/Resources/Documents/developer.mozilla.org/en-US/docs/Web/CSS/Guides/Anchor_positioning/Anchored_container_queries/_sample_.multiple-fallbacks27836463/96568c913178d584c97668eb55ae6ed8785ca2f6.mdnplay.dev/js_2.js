
          const anchorDiv = document.querySelector(".anchor");

let xPos = 250;
let yPos = 120;

function setPos() {
  const maxX = document.body.clientWidth - anchorDiv.clientWidth - 25;
  const maxY = document.body.clientHeight - anchorDiv.clientHeight - 25;

  if (xPos < 25) {
    xPos = 25;
  }

  if (xPos > maxX) {
    xPos = maxX;
  }

  if (yPos < 25) {
    yPos = 25;
  }

  if (yPos > maxY) {
    yPos = maxY;
  }

  anchorDiv.style.left = `${xPos}px`;
  anchorDiv.style.top = `${yPos}px`;
}

setPos();

document.body.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    yPos -= 25;
  } else if (e.key === "d") {
    xPos += 25;
  } else if (e.key === "s") {
    yPos += 25;
  } else if (e.key === "a") {
    xPos -= 25;
  }

  setPos();
});

document.body.addEventListener("click", (e) => {
  xPos = e.clientX;
  yPos = e.clientY;

  setPos();
});
;
        