
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Select an SVG <a> element
const svgLink = document.querySelector("svg a");

// Access the rel property
log(`Rel: ${svgLink.rel}`);

// Set the rel property
svgLink.rel = "alternate bookmark";

// Access the rel property again
log(`New rel: "${svgLink.rel}"`); // New rel: "alternate bookmark"
;
        