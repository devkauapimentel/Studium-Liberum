
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const element = document.querySelector("#elt");
const elementStyle = element.style;
const computedStyle = window.getComputedStyle(element);
// Get style using dot notation
const elemBorderTop = elementStyle.borderTop;
const compBorderTop = computedStyle.borderTop;

log('Format: Style = "Element" / "Computed"');
log(`"borderTop" = "${elemBorderTop}" / "${compBorderTop}"'`);
// Get style using dashed-name property value
const elemBorderTop = elementStyle.getPropertyValue("border-top");
const compBorderTop = computedStyle.getPropertyValue("border-top");
log(`"border-top" = "${elemBorderTop}" / "${compBorderTop}"'`);
// Get shorthand properties using dot notation
const elemBorderTopWidth = elementStyle.borderTopWidth;
const compBorderTopWidth = computedStyle.borderTopWidth;
log(`"borderTopWidth" = "${elemBorderTopWidth}" / "${compBorderTopWidth}"'`);

const elemBorderTopColor = elementStyle.borderTopColor;
const compBorderTopColor = computedStyle.borderTopColor;
log(`"borderTopColor" = "${elemBorderTopColor}" / "${compBorderTopColor}"'`);

const elemBorderTopStyle = elementStyle.borderTopStyle;
const compBorderTopStyle = computedStyle.borderTopStyle;
log(`"borderTopStyle" = "${elemBorderTopStyle}" / "${compBorderTopStyle}"'`);

const elemFontWeight = elementStyle.fontWeight;
const compFontWeight = computedStyle.fontWeight;
log(`"fontWeight" = "${elemFontWeight}" / "${compFontWeight}"'`);
// Set the bottom border style using dot notation
elementStyle.borderBottom = "5px solid green";
;
        