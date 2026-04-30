
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Logging
const images = document.querySelectorAll(".img-square img");
const widthLabel = document.getElementById("width-label");

function updateWidthLabel() {
  widthLabel.textContent = `${document.getElementById("resizable").offsetWidth}px`;
}

updateWidthLabel();
new ResizeObserver(updateWidthLabel).observe(
  document.getElementById("resizable"),
);

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
        