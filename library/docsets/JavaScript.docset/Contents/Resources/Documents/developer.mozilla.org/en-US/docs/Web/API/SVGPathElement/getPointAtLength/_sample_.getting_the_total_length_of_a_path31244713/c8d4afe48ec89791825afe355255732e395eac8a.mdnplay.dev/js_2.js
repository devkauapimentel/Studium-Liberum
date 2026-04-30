
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const basicPath = document.getElementById("line");
const complexPath = document.getElementById("heart");

// Get the length of the heart and divide by 2
const halfLength = complexPath.getTotalLength() / 2;

// Access the getPointAtLength property
const basicMidPoint = basicPath.getPointAtLength(50);
const complexMidPoint = complexPath.getPointAtLength(halfLength);

// The base value of the pathLength attribute
log(`Line mid point: ${basicMidPoint.x}, ${basicMidPoint.y}`);
log(`Heart mid point: ${complexMidPoint.x}, ${complexMidPoint.y}`);
;
        