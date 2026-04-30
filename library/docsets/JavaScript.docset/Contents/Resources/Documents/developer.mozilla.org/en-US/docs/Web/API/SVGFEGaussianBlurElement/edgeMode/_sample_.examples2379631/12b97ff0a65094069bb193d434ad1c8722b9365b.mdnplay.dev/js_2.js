
          const gaussianBlur = document.querySelector("feGaussianBlur");
const log = document.querySelector("output");

if (gaussianBlur.edgeMode) {
  // Default edgeMode for feGaussianBlur is "none" (3)
  log.textContent = `edgeMode.baseVal: ${gaussianBlur.edgeMode.baseVal}`;
} else {
  log.textContent = "edgeMode is not supported in this browser";
}
;
        