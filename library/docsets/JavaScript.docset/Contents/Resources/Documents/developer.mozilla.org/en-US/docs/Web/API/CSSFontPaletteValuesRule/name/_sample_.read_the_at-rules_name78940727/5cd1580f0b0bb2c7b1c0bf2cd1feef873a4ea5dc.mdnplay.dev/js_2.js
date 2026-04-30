
          const log = document.getElementById("log");

const rules = document.getElementById("css-output").sheet.cssRules;
const fontPaletteValuesRule = rules[1]; // a CSSFontPaletteValuesRule interface
log.textContent += ` ${fontPaletteValuesRule.name}`;
;
        