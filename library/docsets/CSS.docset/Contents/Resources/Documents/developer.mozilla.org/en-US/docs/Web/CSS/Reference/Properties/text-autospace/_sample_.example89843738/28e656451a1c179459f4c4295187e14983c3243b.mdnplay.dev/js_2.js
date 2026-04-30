
          const chose = document.querySelector("#autospace");
const fig = document.querySelector("figure");
const codeValue = document.querySelector("#autospace-value");
chose.addEventListener("change", (e) => {
  fig.className = e.target.value;
  codeValue.innerText = e.target.value;
});
;
        