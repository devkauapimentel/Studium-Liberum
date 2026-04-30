
          const selectElem = document.getElementById("reading-flow");
const wrapperElem = document.querySelector(".wrapper");

selectElem.addEventListener("change", () => {
  wrapperElem.style.readingFlow = selectElem.value;
});
;
        