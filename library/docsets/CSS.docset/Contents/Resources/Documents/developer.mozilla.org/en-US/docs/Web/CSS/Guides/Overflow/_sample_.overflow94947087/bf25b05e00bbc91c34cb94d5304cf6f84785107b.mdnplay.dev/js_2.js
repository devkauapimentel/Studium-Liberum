
          const pre = document.querySelector("pre");
const val = document.getElementById("overflowValue");
const check = document.getElementById("wide");
const ocm = document.getElementById("ocm");
const scrollL = document.getElementById("scrollL");
const scrollT = document.getElementById("scrollT");

val.addEventListener("change", () => {
  if (pre.classList.contains("wide")) {
    pre.className = `wide ${val.value}`;
  } else {
    pre.className = `${val.value}`;
  }
  scrollExample();
  clipMargin();
});

wide.addEventListener("change", () => {
  pre.classList.toggle("wide");
  scrollExample();
});

ocm.addEventListener("change", () => {
  clipMargin();
});

scrollL.addEventListener("change", () => {
  scrollExample();
});
scrollT.addEventListener("change", () => {
  scrollExample();
});

function scrollExample() {
  pre.scrollTo({
    top: scrollT.value,
    left: scrollL.value * 2,
    behavior: "smooth",
  });
}

function clipMargin() {
  pre.style.overflowClipMargin = `${ocm.value}em`;
}
;
        