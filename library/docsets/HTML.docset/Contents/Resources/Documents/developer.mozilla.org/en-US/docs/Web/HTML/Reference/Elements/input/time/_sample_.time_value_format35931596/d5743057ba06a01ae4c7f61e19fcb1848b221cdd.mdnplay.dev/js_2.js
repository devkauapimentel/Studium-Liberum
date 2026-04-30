
          const startTime = document.getElementById("startTime");
const valueSpan = document.getElementById("value");

startTime.addEventListener("input", () => {
  valueSpan.innerText = startTime.value;
});
;
        