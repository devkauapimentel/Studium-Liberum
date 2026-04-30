
          const clipPathSelect = document.getElementById("clipPath");
clipPathSelect.addEventListener("change", (evt) => {
  const path = evt.target.value;
  document.getElementById("clipped").style.clipPath = path;
  log(`clip-path: ${path};`);
});
function log(text) {
  const logElement = document.querySelector("#log");
  logElement.innerText = `${text}`;
  logElement.scrollTop = logElement.scrollHeight;
}
;
        