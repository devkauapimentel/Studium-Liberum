
          const allowDrinksCheckbox = document.getElementById("allow-drinks");
const drinkSelect = document.getElementById("drink-select");

allowDrinksCheckbox.addEventListener("change", (event) => {
  drinkSelect.disabled = !event.target.checked;
});
;
        