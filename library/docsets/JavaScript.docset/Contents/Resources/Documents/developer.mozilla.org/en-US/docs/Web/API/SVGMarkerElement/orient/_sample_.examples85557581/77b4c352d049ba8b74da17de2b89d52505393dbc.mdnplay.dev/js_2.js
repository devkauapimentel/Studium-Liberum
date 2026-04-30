
          const marker = document.querySelector("marker");
const log = document.querySelector("output");

if ("orient" in marker) {
  // Read the current orient value
  log.textContent = `orient: "${marker.orient}"\n`; // "auto-start-reverse"

  // Set a new orient value
  marker.orient = "90deg";
  log.textContent += `after setting "90deg": "${marker.orient}"`;
} else {
  log.textContent = "orient is not supported in this browser";
}
;
        