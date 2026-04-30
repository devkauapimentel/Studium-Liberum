
          const evaluator = new XPathEvaluator();
const result = evaluator.evaluate(
  "//div",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
);
document.querySelector("output").textContent = result.snapshotLength;
;
        