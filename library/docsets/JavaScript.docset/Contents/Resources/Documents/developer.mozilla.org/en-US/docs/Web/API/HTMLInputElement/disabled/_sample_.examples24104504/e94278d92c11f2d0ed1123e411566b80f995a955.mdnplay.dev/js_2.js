
          const checkBox = document.getElementById("check-box");
const toggleBox = document.getElementById("toggle-box");

toggleBox.addEventListener("change", (event) => {
  checkBox.disabled = !event.target.checked;
});
;
        