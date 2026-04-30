
          function setBorderWidth(width) {
  document.getElementById("box").style.borderWidth = `${width}px`;
}

document.getElementById("btn1").addEventListener("click", () => {
  setBorderWidth(20);
});
document.getElementById("btn2").addEventListener("click", () => {
  setBorderWidth(5);
});
;
        