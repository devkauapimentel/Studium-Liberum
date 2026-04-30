
          const addNodes = document.querySelector("#add-nodes");
const removeNodes = document.querySelector("#remove-nodes");
const reset = document.querySelector("#reset");
const counter = document.querySelector("#counter");
const target = document.querySelector("#target");
let totalAddedNodes = 0;

addNodes.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  target.appendChild(newPara);
});

removeNodes.addEventListener("click", () => {
  const lastChild = target.lastChild;
  if (lastChild) {
    target.removeChild(lastChild);
  }
});

reset.addEventListener("click", () => self.location.reload());

function logNewNodes(records) {
  for (const record of records) {
    // Check if the childlist of the target node has been mutated
    if (record.type === "childList") {
      totalAddedNodes += record.addedNodes.length;
      // Log the number of nodes added
      counter.textContent = `Total added nodes: ${totalAddedNodes}`;
    }
  }
}

const observer = new MutationObserver(logNewNodes);
observer.observe(target, { childList: true });
;
        