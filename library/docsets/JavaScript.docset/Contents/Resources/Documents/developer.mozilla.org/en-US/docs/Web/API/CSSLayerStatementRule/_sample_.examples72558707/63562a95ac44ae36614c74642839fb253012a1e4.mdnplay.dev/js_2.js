
          const item = document.getElementsByTagName("p")[0];
const rules = document.getElementById("css-output").sheet.cssRules;

const layer = rules[0]; // A CSSLayerStatementRule

item.textContent = `The CSS @layer statement declares the following layers: ${layer.nameList.join(
  ", ",
)}.`;
;
        