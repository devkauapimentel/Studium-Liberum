
          const log = document.getElementById("log");

const rules = document.getElementById("css-output").sheet.cssRules;
const twoRule = rules[2]; // A CSSFontPaletteValuesRule interface
const fiveRule = rules[3]; // A CSSFontPaletteValuesRule interface

log.textContent = `The ${twoRule.name} @font-palette-values base palette is: ${twoRule.basePalette}\n`;
log.textContent += `The ${fiveRule.name} @font-palette-values base palette is: ${fiveRule.basePalette}`;
;
        