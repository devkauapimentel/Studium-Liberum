
          const columnsRange = document.getElementById("columns");
const columnsOutput = document.getElementById("columns-output");
const columnHeightRange = document.getElementById("column-height");
const columnHeightOutput = document.getElementById("column-height-output");

columnsRange.addEventListener("input", () => {
  document.body.style.columnCount = columnsRange.value;
  columnsOutput.textContent = columnsRange.value;
});

columnHeightRange.addEventListener("input", () => {
  document.body.style.columnHeight = `${columnHeightRange.value}em`;
  columnHeightOutput.textContent = `${columnHeightRange.value}em`;
});
;
        