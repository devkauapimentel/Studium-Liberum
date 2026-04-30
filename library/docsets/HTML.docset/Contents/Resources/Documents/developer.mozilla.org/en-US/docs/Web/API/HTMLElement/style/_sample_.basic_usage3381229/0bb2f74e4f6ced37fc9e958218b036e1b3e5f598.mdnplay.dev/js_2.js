
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const element = document.getElementById("elt");
const elementStyle = element.style;

// Longhand styles
log(`"border-top" = '${elementStyle.getPropertyValue("border-top")}'`);
log(`"borderTop" = '${elementStyle.borderTop}'`);

// Expanded longhand styles
log(
  `"border-top-width" = '${elementStyle.getPropertyValue("border-top-width")}'`,
);
log(`"borderTopWidth" = '${elementStyle.borderTopWidth}'`);

log(
  `"border-top-style" = '${elementStyle.getPropertyValue("border-top-style")}'`,
);
log(`"borderTopStyle" = '${elementStyle.borderTopStyle}'`);

log(
  `"border-top-color" = '${elementStyle.getPropertyValue("border-top-color")}'`,
);
log(`"borderTopColor" = '${elementStyle.borderTopColor}'`);

// Original shorthand style
log(`"color" = '${elementStyle.getPropertyValue("color")}'`);
log(`"color" = '${elementStyle.color}'`);

// Defined on parent
log(`"font-weight" = '${elementStyle.getPropertyValue("font-weight")}'`);
log(`"fontWeight" = '${elementStyle.fontWeight}'`);
;
        