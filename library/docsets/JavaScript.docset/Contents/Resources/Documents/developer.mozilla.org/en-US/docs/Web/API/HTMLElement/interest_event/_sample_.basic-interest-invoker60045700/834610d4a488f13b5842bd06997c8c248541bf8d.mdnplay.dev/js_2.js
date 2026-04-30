
          const invoker = document.querySelector("[interestfor]");
const target = invoker.interestForElement;
target.addEventListener("interest", (e) => {
  target.textContent = `Interest shown via the ${e.source.tagName} element.`;
});

target.addEventListener("loseinterest", () => {
  target.textContent = `Interest lost.`;
});
;
        