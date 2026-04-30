
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const complexPath = document.getElementById("heart");
const basicPath = document.getElementById("line");

// Access the pathLength property
const complexPathLength = complexPath.getTotalLength();
const basicPathLength = basicPath.getTotalLength();

// The base value of the pathLength attribute
log(`complexPathLength: ${complexPathLength}`);
log(`basicPathLength: ${basicPathLength}`);
;
        