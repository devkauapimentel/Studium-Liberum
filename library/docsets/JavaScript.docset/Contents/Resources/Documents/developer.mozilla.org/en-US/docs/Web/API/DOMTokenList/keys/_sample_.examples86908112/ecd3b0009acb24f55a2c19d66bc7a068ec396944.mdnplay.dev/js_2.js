
          const span = document.querySelector("span");
const classes = span.classList;
const iterator = classes.keys();

for (let value of iterator) {
  span.textContent += `(${value}) `;
}
;
        