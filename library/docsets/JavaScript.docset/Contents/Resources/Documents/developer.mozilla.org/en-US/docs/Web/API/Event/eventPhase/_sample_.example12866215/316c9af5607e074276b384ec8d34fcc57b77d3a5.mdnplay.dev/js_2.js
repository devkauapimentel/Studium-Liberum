
          let clear = false;
const divInfo = document.getElementById("divInfo");
const divs = document.getElementsByTagName("div");
const chCapture = document.getElementById("chCapture");

chCapture.addEventListener("click", () => {
  removeListeners();
  addListeners();
  clearDivs();
});
clearDivs();
addListeners();

function removeListeners() {
  for (const div of divs) {
    if (div.id !== "divInfo") {
      div.removeEventListener("click", onDivClick, true);
      div.removeEventListener("click", onDivClick, false);
    }
  }
}

function addListeners() {
  for (const div of divs) {
    if (div.id !== "divInfo") {
      if (chCapture.checked) {
        div.addEventListener("click", onDivClick, true);
      } else {
        div.addEventListener("click", onDivClick, false);
        div.onmousemove = () => {
          clear = true;
        };
      }
    }
  }
}

function onDivClick(e) {
  if (clear) {
    clearDivs();
    clear = false;
  }
  if (e.eventPhase === 2) {
    e.currentTarget.style.backgroundColor = "red";
  }
  const level =
    ["none", "capturing", "target", "bubbling"][e.eventPhase] ?? "error";
  const para = document.createElement("p");
  para.textContent = `${e.currentTarget.id}; eventPhase: ${level}`;
  divInfo.appendChild(para);
}

function clearDivs() {
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].id !== "divInfo") {
      divs[i].style.backgroundColor = i % 2 !== 0 ? "#f6eedb" : "#cceeff";
    }
  }
  divInfo.textContent = "";
}
;
        