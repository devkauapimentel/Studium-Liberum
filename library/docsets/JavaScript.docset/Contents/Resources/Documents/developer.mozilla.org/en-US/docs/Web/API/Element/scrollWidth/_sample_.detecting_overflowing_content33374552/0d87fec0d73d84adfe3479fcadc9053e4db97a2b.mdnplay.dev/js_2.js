
          const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");

const log1 = document.getElementById("log1");
const log2 = document.getElementById("log2");

// Check if the scrollWidth is bigger than the clientWidth or not
function isOverflowing(element) {
  return element.scrollWidth > element.clientWidth;
}

function checkOverflow(element, log) {
  if (isOverflowing(element)) {
    log.innerText = `Content is overflowing, scrollWidth is ${element.scrollWidth}px`;
  } else {
    log.innerText = `No overflows, scrollWidth is ${element.scrollWidth}px`;
  }
}

button1.addEventListener("click", () => {
  checkOverflow(div1, log1);
});

button2.addEventListener("click", () => {
  checkOverflow(div2, log2);
});
;
        