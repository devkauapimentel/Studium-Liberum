
          const rows = document.querySelectorAll("thead tr");
const cells = rows[0].cells;

for (const cell of cells) {
  cell.textContent = `${cell.textContent} (${cell.abbr})`;
}
;
        