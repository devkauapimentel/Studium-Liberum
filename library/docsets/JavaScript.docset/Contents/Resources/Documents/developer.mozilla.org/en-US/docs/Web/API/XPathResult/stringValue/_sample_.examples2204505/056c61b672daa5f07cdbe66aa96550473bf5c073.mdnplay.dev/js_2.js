
          const xpath = "//div/text()";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.STRING_TYPE,
  null,
);
document.querySelector("output").textContent = result.stringValue;
;
        