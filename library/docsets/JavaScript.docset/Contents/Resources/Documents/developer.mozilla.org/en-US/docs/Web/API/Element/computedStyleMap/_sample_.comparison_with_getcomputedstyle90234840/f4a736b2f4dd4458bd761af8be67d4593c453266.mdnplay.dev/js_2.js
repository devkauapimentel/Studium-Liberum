
          const item = document.querySelector(".item");
const result = document.querySelector("#result");
const resolvedValues = getComputedStyle(item);
const computedValues = item.computedStyleMap();

result.textContent = `resolvedValues.width = ${resolvedValues.width}
computedValues.get("width") = ${computedValues.get("width")}

resolvedValues.height = ${resolvedValues.height}
computedValues.get("height") = ${computedValues.get("height")}

resolvedValues.backgroundColor = ${resolvedValues.backgroundColor}
computedValues.get("background-color") = ${computedValues.get(
  "background-color",
)}`;
;
        