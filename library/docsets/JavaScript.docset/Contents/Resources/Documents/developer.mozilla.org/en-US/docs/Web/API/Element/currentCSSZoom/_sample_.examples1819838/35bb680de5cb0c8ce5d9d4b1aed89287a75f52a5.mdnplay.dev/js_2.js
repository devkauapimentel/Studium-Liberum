
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
if ("currentCSSZoom" in Element.prototype) {
  const parent = document.querySelector("#parent");
  log(`parent (unzoomed). currentCSSZoom: ${parent.currentCSSZoom}`);
  const child1 = document.querySelector("#child1");
  log(`child1 (zoom: 2). currentCSSZoom: ${child1.currentCSSZoom}`);
  const child2 = document.querySelector("#child2");
  log(`child2 (zoom: 2). currentCSSZoom: ${child2.currentCSSZoom}`);
  const child3Rendered = document.querySelector("#child3-rendered");
  log(
    `child3-rendered (unzoomed). currentCSSZoom: ${child3Rendered.currentCSSZoom}`,
  );
  const child3NotRendered = document.querySelector("#child3-not-rendered");
  log(
    `child3-not-rendered (not rendered): ${child3NotRendered.currentCSSZoom}`,
  );
} else {
  log("Element.currentCSSZoom not supported in this browser");
}
;
        