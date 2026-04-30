
          const pre = document.querySelector("pre");
const attrMap = pre.attributes;

let result = `The 'test' attribute initially contains '${attrMap["test"].value}'.\n`;

result += "We remove it.\n\n";
attrMap.removeNamedItem("test");

result += attrMap.getNamedItem("test")
  ? "And 'test' still exists."
  : "And 'test' is no more to be found.";

pre.textContent = result;
;
        