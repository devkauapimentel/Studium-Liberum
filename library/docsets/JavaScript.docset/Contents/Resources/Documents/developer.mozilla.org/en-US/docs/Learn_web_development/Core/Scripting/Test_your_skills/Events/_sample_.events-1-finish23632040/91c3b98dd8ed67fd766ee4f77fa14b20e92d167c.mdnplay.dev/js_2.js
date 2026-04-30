
          const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  if (btn.className === "on") {
    btn.textContent = "Machine is off";
    btn.className = "off";
  } else {
    btn.textContent = "Machine is on";
    btn.className = "on";
  }
});
;
        