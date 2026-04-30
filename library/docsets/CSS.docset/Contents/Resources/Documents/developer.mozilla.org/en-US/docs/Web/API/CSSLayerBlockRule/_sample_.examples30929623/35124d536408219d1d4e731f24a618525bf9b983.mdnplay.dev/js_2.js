
          const item = document.getElementsByTagName("p")[0];
const rules = document.getElementById("css-output").sheet.cssRules;

const layer = rules[0]; // A CSSLayerBlockRule

item.textContent = `The CSSLayerBlockRule is for the "${layer.name}" layer`;
;
        