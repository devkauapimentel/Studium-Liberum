
          let shipSize = {
  width: 30,
  height: 30,
};

let position = {
  x: 200,
  y: 200,
};

let moveRate = 9;
let turnRate = 5;

let angle = 0;

let spaceship = document.getElementById("spaceship");
function updatePosition(offset) {
  let rad = angle * (Math.PI / 180);
  position.x += Math.sin(rad) * offset;
  position.y -= Math.cos(rad) * offset;

  if (position.x < 0) {
    position.x = 399;
  } else if (position.x > 399) {
    position.x = 0;
  }

  if (position.y < 0) {
    position.y = 399;
  } else if (position.y > 399) {
    position.y = 0;
  }
}
function refresh() {
  let x = position.x - shipSize.width / 2;
  let y = position.y - shipSize.height / 2;
  let transform = `translate(${x} ${y}) rotate(${angle} 15 15) `;

  spaceship.setAttribute("transform", transform);
}
refresh();
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch (event.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "back"
      updatePosition(-moveRate);
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "forward"
      updatePosition(moveRate);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      angle -= turnRate;
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      angle += turnRate;
      break;
  }

  refresh();

  if (event.code !== "Tab") {
    // Consume the event so it doesn't get handled twice,
    // as long as the user isn't trying to move focus away
    event.preventDefault();
  }
});
;
        