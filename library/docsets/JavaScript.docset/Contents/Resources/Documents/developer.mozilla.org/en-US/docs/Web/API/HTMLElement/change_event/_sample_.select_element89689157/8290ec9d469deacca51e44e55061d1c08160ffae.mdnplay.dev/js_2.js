
          const selectElement = document.querySelector(".ice-cream");
const result = document.querySelector(".result");

selectElement.addEventListener("change", (event) => {
  result.textContent = `You like ${event.target.value}`;
});
;
        