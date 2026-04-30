
          const xpath = "//div";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null,
);
document.querySelector("output").textContent = result.snapshotLength;
;
        