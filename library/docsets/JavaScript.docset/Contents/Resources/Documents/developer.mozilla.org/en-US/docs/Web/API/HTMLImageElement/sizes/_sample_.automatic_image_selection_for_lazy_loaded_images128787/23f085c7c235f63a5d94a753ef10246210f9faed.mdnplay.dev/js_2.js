
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const slider = document.getElementById("slider");
const number = document.getElementById("number");
const resizable = document.getElementById("resizable");
const resizableImg = resizable.querySelector("img");
const resizableLabel = resizable.querySelector(".label strong");

function setSize(px) {
  px = Math.min(700, Math.max(100, px));
  resizable.style.width = px + "px";
  resizableImg.sizes = px + "px"; // update sizes so browser can pick new srcset candidate
  resizableLabel.textContent = px + "px";
  slider.value = px;
  number.value = px;
}

slider.addEventListener("input", () => setSize(parseInt(slider.value)));
number.addEventListener("input", () => setSize(parseInt(number.value)));

// Logging
const images = document.querySelectorAll(".img-square img");

images.forEach((img) => {
  if (img.complete) {
    log(`Already cached: ${img.currentSrc} (${img.offsetWidth}px)`);
  }
  img.addEventListener("load", () => {
    log(`Loaded: ${img.currentSrc} (${img.offsetWidth}px container)`);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        log(`Entered viewport: ${img.alt}`);
        observer.unobserve(img);
      }
    });
  },
  {
    root: document.getElementById("scroll-container"),
    rootMargin: "0px",
    threshold: 0.1,
  },
);

images.forEach((img) => observer.observe(img));
;
        