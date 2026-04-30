
          const untilFound = document.querySelector("#until-found-box");
untilFound.addEventListener(
  "beforematch",
  () => (untilFound.textContent = "I've been revealed!"),
);
document.querySelector("#reset").addEventListener("click", () => {
  document.location.hash = "";
  document.location.reload();
});
;
        