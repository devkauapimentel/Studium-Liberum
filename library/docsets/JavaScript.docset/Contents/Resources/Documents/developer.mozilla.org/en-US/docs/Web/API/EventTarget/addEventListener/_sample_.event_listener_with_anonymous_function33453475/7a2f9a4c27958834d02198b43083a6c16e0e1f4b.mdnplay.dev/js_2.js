
          // Function to change the content of t2
function modifyText(newText) {
  const t2 = document.getElementById("t2");
  t2.firstChild.nodeValue = newText;
}

// Function to add event listener to table
const el = document.getElementById("outside");
el.addEventListener("click", function () {
  modifyText("four");
});
;
        