
          const parentDiv = document.getElementById("parent");
const siblingDiv = document.getElementById("sibling");
const displayTypeSelect = document.getElementById("displayType");

function changeDisplayType() {
  parentDiv.style.display = displayTypeSelect.value;
  siblingDiv.style.display = displayTypeSelect.value;
}

displayTypeSelect.addEventListener("change", changeDisplayType);
;
        