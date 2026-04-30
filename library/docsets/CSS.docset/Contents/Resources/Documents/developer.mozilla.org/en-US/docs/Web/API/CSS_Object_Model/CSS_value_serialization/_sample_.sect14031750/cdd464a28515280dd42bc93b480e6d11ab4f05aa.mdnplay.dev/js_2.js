
          const element = document.querySelector("div");
const table = document.createElement("table");
const elemStyle = getComputedStyle(element);
const ruleStyle = document.getElementById("css-output").sheet.cssRules[0].style;
const head = table.createTHead().insertRow();
["Property", "getComputedStyle()", "CSSStyleRule"].forEach((text) => {
  const th = document.createElement("th");
  th.textContent = text;
  head.appendChild(th);
});
for (const property of [
  "position",
  "rotate",
  "color",
  "background-color",
  "border-color",
  "margin",
  "padding",
  "font-size",
  "left",
  "animation-duration",
]) {
  const row = document.createElement("tr");
  const propCell = document.createElement("td");
  const valueCell = document.createElement("td");
  const ruleCell = document.createElement("td");
  propCell.textContent = property;
  valueCell.textContent = elemStyle.getPropertyValue(property);
  ruleCell.textContent = ruleStyle.getPropertyValue(property);
  row.appendChild(propCell);
  row.appendChild(valueCell);
  row.appendChild(ruleCell);
  table.appendChild(row);
}
document.body.appendChild(table);
;
        