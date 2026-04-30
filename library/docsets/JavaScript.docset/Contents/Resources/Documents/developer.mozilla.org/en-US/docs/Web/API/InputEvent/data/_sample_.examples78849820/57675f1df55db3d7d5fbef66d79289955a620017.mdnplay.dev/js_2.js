
          const editable = document.querySelector("input");
const result = document.querySelector(".result");

editable.addEventListener("input", (e) => {
  result.textContent = `Inputted text: ${e.data}`;
});
;
        