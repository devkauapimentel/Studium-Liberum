
          const parent = document.querySelector(".parent");

const addChild = document.querySelector("#add-child");
addChild.addEventListener("click", () => {
  // Only add a child if we don't already have one
  // in addition to the text node "parent"
  if (parent.childNodes.length > 1) {
    return;
  }
  const child = document.createElement("div");
  child.classList.add("child");
  child.textContent = "child";
  parent.appendChild(child);
});

const removeChild = document.querySelector("#remove-child");
removeChild.addEventListener("click", () => {
  const child = document.querySelector(".child");
  parent.removeChild(child);
});
;
        