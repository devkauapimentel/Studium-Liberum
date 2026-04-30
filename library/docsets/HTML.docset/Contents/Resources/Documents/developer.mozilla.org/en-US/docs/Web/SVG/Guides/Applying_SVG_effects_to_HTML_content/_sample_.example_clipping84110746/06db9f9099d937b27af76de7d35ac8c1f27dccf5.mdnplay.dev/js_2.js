
          const circle = document.getElementById("circle");

function toggleRadius() {
  circle.r.baseVal.value = 0.4 - circle.r.baseVal.value;
}

document.querySelector("button").addEventListener("click", toggleRadius);
;
        