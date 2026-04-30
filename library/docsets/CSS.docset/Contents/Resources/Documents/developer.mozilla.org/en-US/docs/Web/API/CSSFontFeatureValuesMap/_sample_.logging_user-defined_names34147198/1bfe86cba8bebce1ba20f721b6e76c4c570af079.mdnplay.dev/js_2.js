
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const rules = document.querySelector("#css-output").sheet.cssRules;
const fontOne = rules[0]; // A CSSFontFeatureValuesRule
if (fontOne.styleset) {
  // styleset property is supported
  log(
    "The user has defined the following name(s)/index(s) for CSSFontFeatureValuesRule.styleset:",
  );
  fontOne.styleset.forEach((value, key) => log(` ${key} : ${value}`));
} else {
  log("Browser does not support CSSFontFeatureValuesMap.styleset property.");
}

if (fontOne.swash) {
  log(
    "The user has defined the following name(s)/index(s) for CSSFontFeatureValuesRule.swash:",
  );
  fontOne.swash.forEach((value, key) => log(` ${key} : ${value}`));
} else {
  log("Browser does not support CSSFontFeatureValuesMap.swash property.");
}
;
        