
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Feature test for ariaOwnsElements
if ("ariaOwnsElements" in Element.prototype) {
  const parentMenu = document.querySelector("#parentMenu");
  log(`parentMenu.getAttribute(): ${parentMenu.getAttribute("aria-owns")}`);
  log(`parentMenu.ariaOwnsElements: ${parentMenu.ariaOwnsElements}`);
  parentMenu.ariaOwnsElements?.forEach((elem) => {
    log(`  id: ${elem.id}`);
  });
} else {
  log("element.ariaOwnsElements: not supported by browser");
}
;
        