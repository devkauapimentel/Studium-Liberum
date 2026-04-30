
          // Function to change the content of t2
function modifyText(newText) {
  const t2 = document.getElementById("t2");
  t2.firstChild.nodeValue = newText;
}

// Add event listener to table with an arrow function
const el = document.getElementById("outside");
el.addEventListener("click", () => {
  modifyText("four");
});
;
        