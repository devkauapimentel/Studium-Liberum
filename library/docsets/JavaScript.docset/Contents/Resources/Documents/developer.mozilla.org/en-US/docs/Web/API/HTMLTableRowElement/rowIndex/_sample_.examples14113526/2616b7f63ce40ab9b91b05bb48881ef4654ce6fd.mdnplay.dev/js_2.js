
          const rows = document.querySelectorAll("tr");

rows.forEach((row) => {
  const z = document.createElement("td");
  z.textContent = `(row #${row.rowIndex})`;
  row.appendChild(z);
});
;
        