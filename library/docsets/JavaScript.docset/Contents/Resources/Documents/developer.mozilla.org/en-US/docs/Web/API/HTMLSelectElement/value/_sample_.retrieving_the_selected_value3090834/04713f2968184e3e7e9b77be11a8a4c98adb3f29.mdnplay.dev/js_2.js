
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}

const select = document.querySelector("#bird-select");
select.addEventListener("change", () => {
  log(`Selection: ${select.value}`);
});
;
        