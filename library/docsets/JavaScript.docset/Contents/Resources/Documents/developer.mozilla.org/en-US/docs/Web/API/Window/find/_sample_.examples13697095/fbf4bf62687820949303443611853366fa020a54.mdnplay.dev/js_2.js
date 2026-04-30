
          function findString(text) {
  document.querySelector("#output").textContent = `String found? ${window.find(
    text,
  )}`;
}

document.getElementById("find-apples").addEventListener("click", () => {
  findString("Apples");
});
document.getElementById("find-bananas").addEventListener("click", () => {
  findString("Bananas");
});
document.getElementById("find-orange").addEventListener("click", () => {
  findString("Orange");
});
;
        