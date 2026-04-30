
          const rows = document.querySelectorAll("tbody tr");

rows.forEach((row) => {
  const z = document.createElement("td");
  z.textContent = `(row #${row.sectionRowIndex})`;
  row.appendChild(z);
});
;
        