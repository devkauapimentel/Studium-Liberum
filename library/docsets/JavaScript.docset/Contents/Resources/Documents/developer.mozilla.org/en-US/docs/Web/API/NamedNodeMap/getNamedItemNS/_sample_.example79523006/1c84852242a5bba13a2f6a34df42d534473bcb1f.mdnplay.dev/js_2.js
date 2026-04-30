
          const parser = new DOMParser();
const xmlString =
  '<warning ob:one="test" xmlns:ob="http://www.example.com/ob">Beware!</warning>';
const doc = parser.parseFromString(xmlString, "application/xml");

const pre = document.querySelector("pre");
const warning = doc.querySelector("warning");

const value = warning.attributes.getNamedItemNS(
  "http://www.example.com/ob",
  "one",
).value;

pre.textContent = `The 'ob:one' attribute contains: ${value}.`;
;
        