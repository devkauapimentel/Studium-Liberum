
          // variable to store our intervalID
let intervalId;

function changeColor() {
  // check if an interval has already been set up
  intervalId ??= setInterval(flashText, 1000);
}

function flashText() {
  const oElem = document.getElementById("my_box");
  oElem.className = oElem.className === "go" ? "stop" : "go";
}

function stopTextColor() {
  clearInterval(intervalId);
  // release our intervalId from the variable
  intervalId = null;
}

document.getElementById("start").addEventListener("click", changeColor);
document.getElementById("stop").addEventListener("click", stopTextColor);
;
        