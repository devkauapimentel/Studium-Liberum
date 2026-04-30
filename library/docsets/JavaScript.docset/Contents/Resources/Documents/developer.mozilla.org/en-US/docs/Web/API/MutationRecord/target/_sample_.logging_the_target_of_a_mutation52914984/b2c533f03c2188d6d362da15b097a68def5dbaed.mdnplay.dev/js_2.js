
          const container = document.querySelector("#container");
const redDiv = document.querySelector("#red-div");
const blueDiv = document.querySelector("#blue-div");
const addToRed = document.querySelector("#add-nodes-to-red-div");
const addToBlue = document.querySelector("#add-nodes-to-blue-div");
const reset = document.querySelector("#reset");
const log = document.querySelector("#log");

addToRed.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  redDiv.appendChild(newPara);
});

addToBlue.addEventListener("click", () => {
  const newPara = document.createElement("p");
  newPara.textContent = `Current time: ${Date.now()}`;
  blueDiv.appendChild(newPara);
});

reset.addEventListener("click", () => self.location.reload());

function logMutationTarget(records) {
  for (const record of records) {
    log.textContent = `Target of mutation: ${record.target.id}`;
  }
}

const observer = new MutationObserver(logMutationTarget);
observer.observe(container, { childList: true, subtree: true });
;
        