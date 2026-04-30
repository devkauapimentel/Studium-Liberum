
          const posElem = document.querySelector(".infobox");
const outputElem = document.querySelector(".output");

try {
  outputElem.textContent = `The positioned element's anchor element is the ${posElem.anchorElement.id}.`;
} catch (e) {
  outputElem.textContent = `Your browser doesn't support the anchorElement property.`;
}
;
        