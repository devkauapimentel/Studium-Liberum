
          const item = document.getElementById("chkPref");
const label = document.getElementById("chk1-label");

function changeCheckbox(code) {
  const checked = item.getAttribute("aria-checked");

  if (code && code !== "Space") {
    return;
  }
  if (checked === "true") {
    item.setAttribute("aria-checked", "false");
  } else {
    item.setAttribute("aria-checked", "true");
  }
}

item.addEventListener("keydown", (event) => {
  changeCheckbox(event.code);
});

label.addEventListener("keydown", (event) => {
  changeCheckbox(event.code);
});

item.addEventListener("click", changeCheckbox);
label.addEventListener("click", changeCheckbox);
;
        